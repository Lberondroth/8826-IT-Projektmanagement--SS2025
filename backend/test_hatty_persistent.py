#!/usr/bin/env python3
"""
Test the fixed Hatty bot with persistent browser
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
    from hatty_bot.core.bot import CampusHubHattyBot
    from config.settings import load_configuration
    
    def test_hatty_with_persistent_browser():
        """Test Hatty bot with persistent browser"""
        print("Testing Hatty bot with persistent browser...")
        
        # Load configuration
        config = load_configuration()
        
        # Initialize bot
        bot = CampusHubHattyBot(config=config)
        
        print("Launching bot...")
        if bot.launch():
            print("✅ Bot launched successfully!")
            print(f"User data directory: {bot.user_data_dir}")
            
            # Test if we can access the page
            if bot.page and not bot.page.is_closed():
                print(f"✅ Page is available: {bot.page.url}")
                
                # Wait a moment for manual verification
                print("Browser will stay open for 30 seconds for manual testing...")
                print("You can manually log into Google AI Studio if needed.")
                time.sleep(30)
                
                # Test sending a simple message (this might require login)
                try:
                    print("Testing message sending...")
                    
                    # Try to find input element
                    input_found = False
                    try:
                        # Wait for any text input to be available
                        bot.page.wait_for_selector('textarea, input[type="text"]', timeout=5000)
                        input_found = True
                        print("✅ Input element found")
                    except:
                        print("⚠️ No input element found (login may be required)")
                    
                    if input_found:
                        print("✅ Bot is ready for messages!")
                    else:
                        print("⚠️ Bot needs manual login setup")
                        
                except Exception as e:
                    print(f"⚠️ Error testing message input: {e}")
                
            else:
                print("❌ Page is not available")
                
            # Clean up
            bot.close()
            print("✅ Test completed")
            return True
        else:
            print("❌ Failed to launch bot")
            return False
            
    if __name__ == "__main__":
        test_hatty_with_persistent_browser()
        
except ImportError as e:
    print(f"Error importing Hatty components: {e}")
    print("Make sure the Hatty module is available.")
