#!/usr/bin/env python3
"""
Test script for Hatty Bot - Browser Only Version
This tests just the browser automation without LLM dependencies.
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
    from config.settings import load_configuration, setup_logging
    
    print("🤖 Testing Hatty Bot Browser (No LLM)")
    print("=" * 50)
    
    # Setup logging
    setup_logging()
    
    # Load configuration
    print("📋 Loading configuration...")
    config = load_configuration()
    print(f"✅ Configuration loaded")
    
    # Initialize bot (without LLM and retriever)
    print("🚀 Initializing Hatty bot...")
    bot = CampusHubHattyBot(config=config)
    
    # Try to launch
    print("🌐 Launching browser...")
    if bot.launch():
        print("✅ Browser launched successfully!")
        print("🎯 AI Studio should be open in the browser")
        
        # Test messages using the realtime method
        test_messages = [
            "Hello, how are you?",
            "What can you help me with?", 
            "Tell me about the university campus"
        ]
        
        print("\n📬 Testing messages with send_message_realtime...")
        for i, message in enumerate(test_messages, 1):
            print(f"\n--- Test Message {i} ---")
            print(f"Sending: {message}")
            
            try:
                # Check if browser is still available
                if not bot.page or bot.page.is_closed():
                    print("❌ Browser page is not available")
                    continue
                
                # Send message using realtime method
                response_generator = bot.send_message_realtime(message)
                print("Response:")
                response_found = False
                for line in response_generator:
                    print(f"  {line}")
                    response_found = True
                
                if not response_found:
                    print("  (No response received)")
                
                # Wait 3 seconds as requested
                print("⏰ Waiting 3 seconds...")
                time.sleep(3)
                
            except Exception as e:
                print(f"❌ Error sending message {i}: {e}")
                import traceback
                traceback.print_exc()
        
        print("\n🎉 Test completed!")
        
        # Test browser methods we need for Flask integration
        print("\n🔧 Testing browser methods for Flask integration...")
        try:
            # Test the methods we use in the Flask app
            print("Testing _update_browser_input...")
            bot._update_browser_input("Test input")
            print("✅ _update_browser_input works")
            
            print("Testing _send_ctrl_enter...")
            bot._send_ctrl_enter()
            print("✅ _send_ctrl_enter works")
            
        except Exception as e:
            print(f"❌ Browser method test failed: {e}")
        
    else:
        print("❌ Failed to launch browser")
        print("⚠️ Browser launch failed - this might be due to:")
        print("   - Missing browser dependencies")
        print("   - Playwright installation issues") 
        print("   - System security restrictions")
        print("   - Edge browser not found")
        
except ImportError as e:
    print(f"❌ Failed to import Hatty components: {e}")
    print("⚠️ Make sure Hatty is properly installed")
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 50)
print("Test completed. Press Enter to exit...")
input()
