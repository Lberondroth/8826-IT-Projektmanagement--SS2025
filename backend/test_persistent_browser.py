#!/usr/bin/env python3
"""
Test persistent browser with user data directory
"""

import sys
import os
from pathlib import Path
import time

# Add Hatty path
hatty_path = Path(__file__).parent / 'Hatty'
if hatty_path.exists():
    sys.path.insert(0, str(hatty_path / 'src'))

try:
    from playwright.sync_api import sync_playwright
    
    def test_persistent_browser():
        """Test persistent browser with user data directory"""
        print("Testing persistent browser...")
        
        # Create user data directory
        user_data_dir = Path(__file__).parent / "browser_data"
        user_data_dir.mkdir(exist_ok=True)
        
        with sync_playwright() as p:
            # Launch browser with persistent user data directory
            browser = p.chromium.launch_persistent_context(
                user_data_dir=str(user_data_dir),
                headless=False,
                args=[
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-blink-features=AutomationControlled",
                    "--disable-web-security",
                    "--disable-features=VizDisplayCompositor"
                ]
            )
            
            # Get the default page
            if browser.pages:
                page = browser.pages[0]
            else:
                page = browser.new_page()
            
            print("Browser launched successfully!")
            print(f"User data directory: {user_data_dir}")
            
            # Navigate to Google AI Studio
            print("Navigating to Google AI Studio...")
            page.goto("https://aistudio.google.com/")
            
            print("Waiting 5 seconds for page to load...")
            time.sleep(5)
            
            # Check if we're on the right page
            title = page.title()
            print(f"Page title: {title}")
            
            # Keep browser open for manual testing
            print("Browser will stay open for 30 seconds for manual testing...")
            time.sleep(30)
            
            browser.close()
            print("Test completed!")
            return True
            
    if __name__ == "__main__":
        test_persistent_browser()
        
except ImportError as e:
    print(f"Error importing playwright: {e}")
    print("Please install playwright: pip install playwright")
    print("Then install browsers: playwright install")
