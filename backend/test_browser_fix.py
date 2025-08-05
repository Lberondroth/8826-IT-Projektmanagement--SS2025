#!/usr/bin/env python3
"""
Test script to verify the browser launch fix.
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from Hatty.src.hatty_bot.core.bot import CampusHubHattyBot

def test_browser_launch():
    """Test the browser launch with the new fixes."""
    print("🧪 Testing Browser Launch Fix")
    print("=" * 50)
    
    # Create bot instance
    config = {
        "target_url": "https://aistudio.google.com/prompts/16ssbZg2sv4lp-rlqqpX3RaYsAIj1ydRs",
        "default_timeout": 30000
    }
    
    bot = CampusHubHattyBot(config=config)
    
    try:
        print("🚀 Attempting to launch browser...")
        success = bot.launch()
        
        if success:
            print("✅ Browser launched successfully!")
            print(f"📍 Current URL: {bot.page.url if bot.page else 'N/A'}")
            
            # Wait a moment to see if browser stays open
            import time
            time.sleep(5)
            
            # Try to get page title
            if bot.page:
                try:
                    title = bot.page.title()
                    print(f"📄 Page title: {title}")
                except Exception as e:
                    print(f"⚠️ Could not get page title: {e}")
            
            return True
        else:
            print("❌ Browser launch failed")
            return False
            
    except Exception as e:
        print(f"💥 Error during test: {e}")
        return False
    finally:
        # Clean up
        try:
            bot.close()
            print("🧹 Browser closed")
        except:
            pass

if __name__ == "__main__":
    success = test_browser_launch()
    sys.exit(0 if success else 1)
