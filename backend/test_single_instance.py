#!/usr/bin/env python3
"""
Test script to verify the Hatty bot doesn't launch multiple instances.
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from Hatty.src.hatty_bot.core.bot import CampusHubHattyBot


def test_single_instance():
    """Test that only one instance can launch at a time."""
    print("🧪 Testing Single Instance Prevention")
    print("=" * 40)
    
    # Create first bot instance
    config = {
        "target_url": "https://www.google.com",
        "default_timeout": 10000
    }
    
    print("📍 Creating first bot instance...")
    bot1 = CampusHubHattyBot(config=config)
    
    print("📍 Creating second bot instance...")
    bot2 = CampusHubHattyBot(config=config)
    
    try:
        from playwright.sync_api import sync_playwright
        
        print("🚀 Starting Playwright for first bot...")
        bot1.playwright = sync_playwright().start()
        
        print("🌐 Launching first browser...")
        success1 = bot1._try_regular_browser()
        print(f"First browser launch: {'✅ Success' if success1 else '❌ Failed'}")
        
        if success1:
            print("🚀 Starting Playwright for second bot...")
            bot2.playwright = sync_playwright().start()
            
            print("🌐 Attempting second browser launch (should be prevented)...")
            success2 = bot2.launch()
            print(f"Second browser launch: {'❌ Should have been prevented!' if success2 else '✅ Correctly prevented'}")
            
            # Wait a moment
            import time
            time.sleep(2)
            
            return not success2  # Success if second launch was prevented
        else:
            print("❌ First browser launch failed - cannot test prevention")
            return False
            
    except Exception as e:
        print(f"💥 Error: {e}")
        return False
    finally:
        try:
            print("🧹 Cleaning up...")
            bot1.close()
            bot2.close()
        except Exception:
            pass


if __name__ == "__main__":
    success = test_single_instance()
    print(f"\n🎯 Test result: {'✅ PASSED' if success else '❌ FAILED'}")
    sys.exit(0 if success else 1)
