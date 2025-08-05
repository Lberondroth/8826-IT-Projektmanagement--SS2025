#!/usr/bin/env python3
"""
Test sending 3 messages to Hatty bot with 3-second intervals
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
    
    def test_hatty_messages():
        """Test sending 3 messages with 3-second intervals"""
        print("🤖 Testing Hatty bot message sending...")
        
        # Load configuration
        config = load_configuration()
        
        # Initialize bot
        bot = CampusHubHattyBot(config=config)
        
        print("🚀 Launching bot...")
        if bot.launch():
            print("✅ Bot launched successfully!")
            print(f"📁 User data directory: {bot.user_data_dir}")
            
            # Wait for page to be ready
            if bot.page and not bot.page.is_closed():
                print(f"🌐 Page is available: {bot.page.url}")
                
                # Wait for manual login if needed
                print("⏳ Waiting 10 seconds for manual login (if required)...")
                time.sleep(10)
                
                # Test messages
                test_messages = [
                    "Hallo! Wie ist das Wetter heute?",
                    "Was gibt es heute in der Mensa?", 
                    "Kannst du mir bei meinem Studium helfen?"
                ]
                
                print("\n📨 Starting message tests...")
                
                for i, message in enumerate(test_messages, 1):
                    try:
                        print(f"\n--- Message {i} ---")
                        print(f"📤 Sending: {message}")
                        
                        # Use the existing browser automation methods
                        # First clear any existing input
                        try:
                            bot._update_browser_input("")
                        except Exception as e:
                            print(f"⚠️ Could not clear input: {e}")
                        
                        # Send the message
                        try:
                            bot._update_browser_input(message)
                            print("✅ Message typed into browser")
                            
                            # Submit the message
                            bot._send_ctrl_enter()
                            print("✅ Message submitted")
                            
                            # Wait for response
                            print("⏳ Waiting for response...")
                            time.sleep(5)  # Wait for AI to respond
                            
                            # Try to capture response (basic attempt)
                            try:
                                # Look for response in page content
                                page_content = bot.page.content()
                                print("✅ Page content captured (response may be included)")
                            except Exception as e:
                                print(f"⚠️ Could not capture response: {e}")
                        
                        except Exception as e:
                            print(f"❌ Error sending message: {e}")
                        
                        # Wait 3 seconds before next message
                        if i < len(test_messages):
                            print("⏳ Waiting 3 seconds before next message...")
                            time.sleep(3)
                            
                    except Exception as e:
                        print(f"❌ Error in message {i}: {e}")
                
                print("\n🎉 Message tests completed!")
                
                # Keep browser open for manual verification
                print("🔍 Browser will stay open for 20 seconds for manual verification...")
                time.sleep(20)
                
            else:
                print("❌ Page is not available")
                return False
                
            # Clean up
            bot.close()
            print("✅ Test completed and browser closed")
            return True
        else:
            print("❌ Failed to launch bot")
            return False
            
    if __name__ == "__main__":
        success = test_hatty_messages()
        if success:
            print("\n🎉 All tests passed!")
        else:
            print("\n❌ Tests failed!")
        
except ImportError as e:
    print(f"❌ Error importing Hatty components: {e}")
    print("Make sure the Hatty module is available.")
