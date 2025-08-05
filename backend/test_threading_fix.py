#!/usr/bin/env python3
"""
Test script to verify that the threading fix works for Hatty bot.
This script will send multiple messages to the API to test thread safety.
"""

import requests
import time
import json
import sys

API_BASE = "http://localhost:5000"

def test_api_health():
    """Test that the API is running"""
    try:
        response = requests.get(f"{API_BASE}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ API Health check passed")
            return True
        else:
            print(f"❌ API Health check failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API Health check failed: {e}")
        return False

def test_hatty_status():
    """Test Hatty bot status"""
    try:
        response = requests.get(f"{API_BASE}/api/hatty/status", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Hatty status: {data}")
            return True
        else:
            print(f"❌ Hatty status check failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Hatty status check failed: {e}")
        return False

def send_chat_message(message: str) -> bool:
    """Send a chat message and check for threading errors"""
    try:
        print(f"📤 Sending message: '{message}'")
        response = requests.post(
            f"{API_BASE}/api/hatty/chat",
            json={"message": message},
            timeout=45
        )
        
        if response.status_code == 200:
            data = response.json()
            response_text = data.get("response", "")
            print(f"📥 Response: {response_text[:100]}...")
            
            # Check for threading errors
            if "thread" in response_text.lower():
                print("❌ Threading error detected in response")
                return False
            else:
                print("✅ Message sent successfully, no threading errors")
                return True
        else:
            print(f"❌ Chat message failed with status {response.status_code}")
            if response.text:
                print(f"Error details: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Chat message failed: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Testing Hatty Bot Threading Fix")
    print("=" * 50)
    
    # Test API health
    if not test_api_health():
        print("❌ Cannot proceed, API is not healthy")
        sys.exit(1)
    
    # Test Hatty status
    if not test_hatty_status():
        print("❌ Cannot proceed, Hatty is not available")
        sys.exit(1)
    
    # Test messages
    test_messages = [
        "Hallo, wie geht es dir?",
        "Was ist das Wetter heute?",
        "Kannst du mir helfen?",
        "Erzähl mir einen Witz",
        "Wie spät ist es?"
    ]
    
    print(f"\n🔄 Testing {len(test_messages)} messages for threading issues...")
    
    success_count = 0
    for i, message in enumerate(test_messages, 1):
        print(f"\n--- Test {i}/{len(test_messages)} ---")
        if send_chat_message(message):
            success_count += 1
        
        # Wait between messages to simulate real usage
        if i < len(test_messages):
            print("⏳ Waiting 3 seconds before next message...")
            time.sleep(3)
    
    print(f"\n📊 Test Results:")
    print(f"✅ Successful messages: {success_count}/{len(test_messages)}")
    
    if success_count == len(test_messages):
        print("🎉 All tests passed! Threading issue appears to be fixed.")
    else:
        print("⚠️  Some tests failed. Threading issue may still exist.")
    
    print("=" * 50)

if __name__ == "__main__":
    main()
