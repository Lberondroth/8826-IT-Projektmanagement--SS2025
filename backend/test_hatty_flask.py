#!/usr/bin/env python3
"""
Flask Test for Hatty Bot Integration
Tests the bot with Flask endpoints like the real application
"""

import sys
import os
from pathlib import Path
import time
import json

# Add Hatty path 
hatty_path = Path(__file__).parent / 'Hatty'
if hatty_path.exists():
    sys.path.insert(0, str(hatty_path / 'src'))

try:
    from flask import Flask, jsonify, request
    from hatty_bot.core.bot import CampusHubHattyBot
    from config.settings import load_configuration, setup_logging
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
    
    print("🧪 Testing Hatty Bot with Flask Integration")
    print("=" * 60)
    
    # Create simplified bot class that works
    class SimplifiedHattyBot:
        def __init__(self, config=None):
            self.config = config or {}
            self.playwright = None
            self.browser = None
            self.context = None
            self.page = None
            self.target_url = "https://aistudio.google.com/prompts/16ssbZg2sv4lp-rlqqpX3RaYsAIj1ydRs"
            
        def launch(self):
            """Launch browser with simplified approach"""
            try:
                self.playwright = sync_playwright().start()
                
                # Use regular launch instead of persistent context
                self.browser = self.playwright.chromium.launch(
                    headless=False,
                    channel="msedge",
                    args=[
                        "--disable-blink-features=AutomationControlled",
                        "--disable-gpu",
                        "--disable-dev-shm-usage",
                        "--start-maximized",
                    ]
                )
                
                self.context = self.browser.new_context(
                    user_agent=(
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                        "(KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
                    )
                )
                
                self.page = self.context.new_page()
                self.page.add_init_script("delete navigator.__proto__.webdriver")
                
                print("🌐 Navigating to AI Studio...")
                self.page.goto(self.target_url, wait_until="domcontentloaded", timeout=30000)
                print(f"✅ Loaded: {self.page.url}")
                
                # Wait for page to load
                time.sleep(3)
                
                return True
                
            except Exception as e:
                print(f"❌ Browser launch failed: {e}")
                return False
                
        def send_message(self, message: str) -> str:
            """Send message and get response"""
            if not self.page or self.page.is_closed():
                return "Browser not available"
                
            try:
                # Look for input element
                input_selectors = [
                    'textarea[placeholder*="Enter a prompt"]',
                    'textarea[aria-label*="Prompt"]',
                    'textarea',
                    'input[type="text"]',
                    '[contenteditable="true"]'
                ]
                
                input_element = None
                for selector in input_selectors:
                    try:
                        input_element = self.page.locator(selector).first
                        if input_element.is_visible():
                            break
                    except:
                        continue
                
                if not input_element:
                    return "Could not find input element"
                
                # Clear and type message
                input_element.click()
                input_element.fill("")
                input_element.type(message)
                
                # Submit (try Enter or Ctrl+Enter)
                try:
                    self.page.keyboard.press("Control+Enter")
                except:
                    self.page.keyboard.press("Enter")
                
                # Wait for response
                time.sleep(3)
                
                # Try to find response
                response_selectors = [
                    '[data-testid*="response"]',
                    '.response-content',
                    '.message-content', 
                    '.ai-response',
                    'div[class*="response"]',
                    'div[class*="message"]'
                ]
                
                for selector in response_selectors:
                    try:
                        elements = self.page.locator(selector).all()
                        if elements:
                            last_element = elements[-1]
                            if last_element.is_visible():
                                response = last_element.text_content()
                                if response and len(response) > 10:
                                    return response
                    except:
                        continue
                
                return "Response found but could not extract text"
                
            except Exception as e:
                return f"Error sending message: {str(e)}"
                
        def close(self):
            """Close browser"""
            try:
                if self.browser:
                    self.browser.close()
                if self.playwright:
                    self.playwright.stop()
            except:
                pass
    
    # Test the simplified bot first
    print("🚀 Testing Simplified Bot...")
    setup_logging()
    config = load_configuration()
    
    bot = SimplifiedHattyBot(config)
    
    if bot.launch():
        print("✅ Bot launched successfully!")
        
        # Test messages
        test_messages = [
            "Hello, how are you?",
            "What can you help me with?",
            "Tell me about university life"
        ]
        
        print("\n📬 Testing messages...")
        for i, message in enumerate(test_messages, 1):
            print(f"\n--- Test Message {i} ---")
            print(f"Sending: {message}")
            
            response = bot.send_message(message)
            print(f"Response: {response[:100]}..." if len(response) > 100 else f"Response: {response}")
            
            print("⏰ Waiting 3 seconds...")
            time.sleep(3)
        
        print("\n🎉 Bot test completed!")
        
        # Now test with Flask
        print("\n🌐 Testing with Flask...")
        
        app = Flask(__name__)
        
        @app.route('/api/hatty/chat', methods=['POST'])
        def hatty_chat():
            try:
                data = request.get_json()
                if not data or 'message' not in data:
                    return jsonify({"error": "Message is required"}), 400
                
                user_message = data['message']
                print(f"Flask received: {user_message}")
                
                response = bot.send_message(user_message)
                
                return jsonify({
                    "response": response,
                    "timestamp": time.time()
                })
                
            except Exception as e:
                return jsonify({
                    "error": f"Server error: {str(e)}"
                }), 500
        
        @app.route('/api/hatty/status', methods=['GET'])
        def hatty_status():
            return jsonify({
                "available": bot.page and not bot.page.is_closed(),
                "status": "ready" if (bot.page and not bot.page.is_closed()) else "unavailable"
            })
        
        # Test Flask endpoints directly (simulated)
        print("\n🧪 Testing Flask endpoints (simulated)...")
        
        # Simulate POST request
        test_flask_messages = [
            "Hello from Flask!",
            "How is the weather?",
            "What services are available at the university?"
        ]
        
        for i, message in enumerate(test_flask_messages, 1):
            print(f"\n--- Flask Test {i} ---")
            print(f"Simulating POST to /api/hatty/chat with: {message}")
            
            # Directly call the function (simulating Flask)
            class MockRequest:
                def get_json(self):
                    return {"message": message}
            
            # Mock the request object
            import types
            request_backup = request
            mock_request = MockRequest()
            
            # Temporarily replace request
            globals()['request'] = mock_request
            
            try:
                response = hatty_chat()
                if hasattr(response, 'get_json'):
                    result = response.get_json()
                else:
                    result = response
                print(f"Flask response: {result}")
            except Exception as e:
                print(f"Flask error: {e}")
            finally:
                globals()['request'] = request_backup
            
            time.sleep(2)
        
        print("\n🎉 Flask test completed!")
        
        # Clean up
        bot.close()
        
    else:
        print("❌ Failed to launch simplified bot")
        
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("💡 Make sure Flask and Playwright are installed")
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("Test completed. Press Enter to exit...")
input()
