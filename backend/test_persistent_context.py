#!/usr/bin/env python3
"""
Test script to verify persistent context works with AI Studio.
This should keep your login session between runs.
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from Hatty.src.hatty_bot.core.bot import CampusHubHattyBot


def test_persistent_ai_studio():
    """Test persistent context with AI Studio for login preservation."""
    print("🧪 Testing Persistent AI Studio Context")
    print("=" * 45)
    
    # Create bot instance with AI Studio URL
    config = {
        "target_url": "https://aistudio.google.com/prompts/16ssbZg2sv4lp-rlqqpX3RaYsAIj1ydRs",
        "default_timeout": 30000
    }
    
    bot = CampusHubHattyBot(config=config)
    
    try:
        print("🚀 Starting Playwright...")
        from playwright.sync_api import sync_playwright
        bot.playwright = sync_playwright().start()
        
        print("🔄 Attempting persistent context launch...")
        print("   This should preserve your login session!")
        
        success = bot._try_persistent_context()
        
        if success:
            print("✅ Persistent context launched successfully!")
            print("🎉 AI Studio page loaded!")
            
            if bot.page:
                print(f"📍 Current URL: {bot.page.url}")
                try:
                    title = bot.page.title()
                    print(f"📄 Page title: {title}")
                except Exception as e:
                    print(f"⚠️ Could not get page title: {e}")
                
                # Check if we need to log in
                print("\n🔍 Checking login status...")
                try:
                    # Look for login indicators
                    sign_in_elements = bot.page.locator("text=Sign in").count()
                    login_elements = bot.page.locator("text=Login").count()
                    
                    if sign_in_elements > 0 or login_elements > 0:
                        print("🔐 Login required - please log in manually in the browser")
                        print("   Your session will be saved for next time!")
                    else:
                        print("✅ Already logged in! Session persistence working!")
                        
                    # Look for AI Studio interface elements
                    textarea_count = bot.page.locator("textarea").count()
                    if textarea_count > 0:
                        print(f"📝 Found {textarea_count} text input area(s) - AI Studio interface detected")
                    
                except Exception as e:
                    print(f"⚠️ Could not check login status: {e}")
                
                # Wait longer to allow manual login if needed
                import time
                print("\n⏳ Keeping browser open for 30 seconds...")
                print("   If you need to log in, do it now - it will be saved!")
                time.sleep(30)
                
                print("✅ Persistent context test completed successfully!")
                return True
        else:
            print("❌ Persistent context launch failed")
            print("   Falling back to regular browser...")
            
            # Try regular browser as fallback
            if bot._try_regular_browser():
                print("✅ Regular browser launched successfully!")
                print("⚠️ Note: Login will NOT be preserved with regular browser")
                return True
            else:
                print("❌ Both persistent and regular browser failed")
                return False
            
    except Exception as e:
        print(f"💥 Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        try:
            print("\n🧹 Cleaning up...")
            bot.close()
            print("✅ Cleanup completed")
        except Exception as e:
            print(f"⚠️ Cleanup error: {e}")


if __name__ == "__main__":
    success = test_persistent_ai_studio()
    
    if success:
        print("\n🎉 Test completed successfully!")
        print("   If you logged in, your session should be preserved for next time.")
    else:
        print("\n❌ Test failed")
    
    sys.exit(0 if success else 1)
