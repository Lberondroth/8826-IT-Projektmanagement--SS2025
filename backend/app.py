from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import logging
import sys
import os
from pathlib import Path
from typing import Dict, List, Any, Optional

# Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class ColoredFormatter(logging.Formatter):
    """Custom formatter to add colors to log levels"""
    
    COLORS = {
        'DEBUG': Colors.OKCYAN,
        'INFO': Colors.OKGREEN,
        'WARNING': Colors.WARNING,
        'ERROR': Colors.FAIL,
        'CRITICAL': Colors.FAIL + Colors.BOLD,
    }

    def format(self, record):
        log_color = self.COLORS.get(record.levelname, '')
        record.levelname = f"{log_color}{record.levelname}{Colors.ENDC}"
        record.name = f"{Colors.OKBLUE}{record.name}{Colors.ENDC}"
        return super().format(record)

# Configure enhanced logging
def setup_logging():
    # Create custom logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    
    # Clear existing handlers
    logger.handlers.clear()
    
    # Create console handler with color formatting
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    
    # Create formatter
    formatter = ColoredFormatter(
        f'{Colors.BOLD}%(asctime)s{Colors.ENDC} - %(name)s - %(levelname)s - %(message)s',
        datefmt='%H:%M:%S'
    )
    console_handler.setFormatter(formatter)
    
    # Add handler to logger
    logger.addHandler(console_handler)
    
    return logger

# Initialize logger
logger = setup_logging()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def fetch_mensa_webpage() -> Optional[BeautifulSoup]:
    """Fetch and parse the mensa webpage"""
    url = "https://www.stw-d.de/gastronomie/speiseplaene/mensa-kamp-lintfort/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    logger.info(f"Fetching data from: {url}")
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    logger.info(f"Successfully fetched data. Status: {response.status_code}")
    
    return BeautifulSoup(response.content, 'html.parser')

def find_current_day_element(soup: BeautifulSoup) -> Optional[Any]:
    """Find the current day element in the parsed HTML"""
    current_day = soup.find('div', class_='day current')
    if not current_day:
        current_day = soup.find('div', class_='day')
        if current_day:
            logger.warning("No 'current' day found, using first available day")
    
    if not current_day:
        logger.error("No menu data found in HTML")
    
    return current_day

def extract_menu_items(counter: Any) -> List[str]:
    """Extract menu items from a counter element"""
    menu_ul = counter.find('ul', class_='menu')
    menu_items_list = []
    
    if menu_ul:
        menu_lis = menu_ul.find_all('li')
        for li in menu_lis:
            text = li.get_text(strip=True)
            if text and text != "":
                menu_items_list.append(text)
    
    return menu_items_list

def extract_student_price(counter: Any) -> str:
    """Extract student price from a counter element"""
    price_ul = counter.find('ul', class_='price')
    student_price = ""
    
    if price_ul:
        price_lis = price_ul.find_all('li')
        for li in price_lis:
            text = li.get_text(strip=True)
            if 'Studierende:' in text:
                price_match = re.search(r'(\d+,\d+\s*€)', text)
                if price_match:
                    student_price = price_match.group(1)
                break
    
    return student_price

def extract_image_url(counter: Any) -> str:
    """Extract image URL from a counter element"""
    thumbnail = counter.find('div', class_='thumbnail')
    image_url = ""
    
    if thumbnail:
        style = thumbnail.get('style', '')
        url_match = re.search(r'url\((.*?)\)', style)
        if url_match:
            image_url = url_match.group(1).strip('"\'')
    
    return image_url

def parse_menu_counter(counter: Any) -> Optional[Dict[str, Any]]:
    """Parse a single menu counter into a menu item"""
    title_elem = counter.find('h2')
    if not title_elem:
        return None
    
    title = title_elem.get_text(strip=True)
    menu_items_list = extract_menu_items(counter)
    
    if not menu_items_list:  # Skip if no menu items
        return None
    
    student_price = extract_student_price(counter)
    image_url = extract_image_url(counter)
    
    logger.info(f"Added menu item: {title} - {student_price}")
    return {
        "title": title,
        "description": menu_items_list,
        "price": student_price,
        "image": image_url
    }

def scrape_mensa_data():
    """Scrape mensa data from STW-D website"""
    try:
        logger.info("Starting mensa data scraping...")
        
        # Fetch and parse webpage
        soup = fetch_mensa_webpage()
        current_day = find_current_day_element(soup)
        
        if not current_day:
            return {"error": "No menu data found", "items": []}
        
        # Extract date information
        date_attr = current_day.get('data-date', '')
        day_attr = current_day.get('data-day', '')
        logger.info(f"Found menu for: {day_attr}, {date_attr}")
        
        # Process menu counters
        counters = current_day.find_all('div', class_='counter')
        logger.info(f"Found {len(counters)} menu counters")
        
        menu_items = []
        for counter in counters:
            menu_item = parse_menu_counter(counter)
            if menu_item:
                menu_items.append(menu_item)
        
        logger.info(f"Successfully scraped {len(menu_items)} menu items")
        return {
            "date": date_attr,
            "day": day_attr,
            "items": menu_items,
            "lastUpdated": datetime.now().isoformat()
        }
        
    except requests.RequestException as e:
        logger.error(f"Network error: {str(e)}")
        return {"error": f"Network error: {str(e)}", "items": []}
    except Exception as e:
        logger.error(f"Parsing error: {str(e)}")
        return {"error": f"Parsing error: {str(e)}", "items": []}

@app.route('/api/mensa', methods=['GET'])
def get_mensa_data():
    """API endpoint to get mensa data"""
    logger.info("Received request for mensa data")
    data = scrape_mensa_data()
    logger.info("Returning mensa data")
    return jsonify(data)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "mensa-scraper"})

# Hatty integration - Google Generative AI implementation
HATTY_AVAILABLE = False
try:
    from hatty_gemini import get_hatty_instance, cleanup_hatty
    HATTY_AVAILABLE = True
    logger.info("Hatty Gemini components imported successfully")
except ImportError as e:
    logger.warning(f"Hatty Gemini components not available: {e}")
    HATTY_AVAILABLE = False

# Global Hatty bot instance
hatty_bot_instance = None

def initialize_hatty_bot():
    """Initialize Hatty bot if available (Google Generative AI implementation)"""
    global hatty_bot_instance
    
    if not HATTY_AVAILABLE:
        logger.warning("Hatty Gemini components not available")
        return False
    
    # If we already have an instance, don't create another
    if hatty_bot_instance is not None:
        logger.info("Hatty bot instance already exists - skipping initialization")
        return True
    
    try:
        # Get Hatty instance
        hatty_bot_instance = get_hatty_instance()
        
        if hatty_bot_instance:
            logger.info("Hatty bot instance created successfully")
            return True
        else:
            logger.warning("Failed to create Hatty bot instance")
            return False
        
    except Exception as e:
        logger.warning(f"Hatty bot initialization failed: {str(e)}")
        logger.info("Continuing without chatbot functionality")
        return False

@app.route('/api/hatty/chat', methods=['POST'])
def hatty_chat():
    """Chat with Hatty bot using Google Generative AI"""
    global hatty_bot_instance
    
    if not HATTY_AVAILABLE:
        return jsonify({
            "error": "Hatty bot not available",
            "response": "Entschuldigung, der Chatbot ist momentan nicht verfügbar."
        }), 503
    
    # Initialize or get Hatty instance
    if hatty_bot_instance is None:
        logger.info("Initializing Hatty bot...")
        hatty_bot_instance = get_hatty_instance()
        
        if hatty_bot_instance is None:
            return jsonify({
                "error": "Hatty bot initialization failed",
                "response": "Entschuldigung, der Chatbot konnte nicht initialisiert werden."
            }), 503
    
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "Message is required"}), 400
        
        user_message = data['message']
        logger.info(f"Received chat message: {user_message}")
        
        # Send message to Hatty and get response
        logger.info("Calling hatty_bot_instance.send_message...")
        response = hatty_bot_instance.send_message(user_message)
        logger.info(f"Raw response from Hatty: '{response}' (type: {type(response)})")
        
        if not response or response.strip() == "":
            logger.warning("Empty response from Hatty")
            response = "Hatty: Entschuldigung, ich konnte keine Antwort generieren."
        
        logger.info(f"Hatty response: {response}")
        return jsonify({
            "response": response,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in Hatty chat: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "response": "Entschuldigung, es ist ein Fehler aufgetreten."
        }), 500

@app.route('/api/hatty/status', methods=['GET'])
def hatty_status():
    """Check Hatty bot status"""
    is_available = HATTY_AVAILABLE and hatty_bot_instance is not None
    if is_available and hatty_bot_instance:
        # Check if the bot is actually working
        try:
            is_available = hatty_bot_instance.is_available()
        except Exception as e:
            logger.warning(f"Error checking Hatty availability: {e}")
            is_available = False
    
    return jsonify({
        "available": is_available,
        "status": "ready" if is_available else "unavailable"
    })

if __name__ == '__main__':
    import atexit
    import signal
    
    # Set up cleanup handlers
    def cleanup_handler():
        """Clean up resources on exit"""
        global hatty_bot_instance
        logger.info("Shutting down application...")
        if hatty_bot_instance:
            try:
                cleanup_hatty()
            except Exception as e:
                logger.warning(f"Error cleaning up Hatty bot: {e}")
    
    # Register cleanup handlers
    atexit.register(cleanup_handler)
    signal.signal(signal.SIGTERM, lambda signum, frame: cleanup_handler())
    if hasattr(signal, 'SIGINT'):
        signal.signal(signal.SIGINT, lambda signum, frame: cleanup_handler())
    
    logger.info("Starting Flask application...")
    
    # Initialize Hatty bot if available
    if initialize_hatty_bot():
        logger.info("Hatty bot initialized and ready")
    else:
        logger.warning("Hatty bot not available - continuing without chatbot functionality")
    
    logger.info("Server will be available at: http://localhost:5000")
    logger.info("API endpoints:")
    logger.info("  - GET /api/mensa - Get mensa menu data")
    logger.info("  - GET /api/health - Health check")
    logger.info("  - POST /api/hatty/chat - Chat with Hatty bot")
    logger.info("  - GET /api/hatty/status - Check Hatty bot status")
    
    try:
        # Disable reloader to prevent multiple instances
        app.run(debug=True, host='localhost', port=5000, use_reloader=False)
    except KeyboardInterrupt:
        logger.info("Application interrupted by user")
    finally:
        cleanup_handler()
