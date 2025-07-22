#!/usr/bin/env python3
"""
Simple test to verify browser opens and stays open.
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from Hatty.src.hatty_bot.core.bot import CampusHubHattyBot


def test_simple_browser():
    """Test that browser opens and stays open."""
    print("🧪 Simple Browser Test")
    print("=" * 30)
    
    # Create bot instance
    config = {
        "target_url": "https://www.google.com",
        "default_timeout": 10000
    }
    
    bot = CampusHubHattyBot(config=config)
    
    try:
        print("🚀 Starting Playwright...")
        from playwright.sync_api import sync_playwright
        bot.playwright = sync_playwright().start()
        
        print("🌐 Attempting to launch browser...")
        if bot._try_regular_browser():
            print("✅ Browser launched successfully!")
            
            if bot.page:
                print(f"📍 Current URL: {bot.page.url}")
                print(f"📄 Page title: {bot.page.title()}")
                
                # Wait a moment
                import time
                print("⏳ Waiting 3 seconds...")
                time.sleep(3)
                
                print("✅ Browser test successful!")
                return True
        else:
            print("❌ Browser launch failed")
            return False
            
    except Exception as e:
        print(f"💥 Error: {e}")
        return False
    finally:
        try:
            bot.close()
            print("🧹 Cleaned up")
        except Exception:
            pass


if __name__ == "__main__":
    success = test_simple_browser()
    sys.exit(0 if success else 1)
