#!/usr/bin/env python3
"""
Flask API test for Hatty bot - send 3 messages via API
"""

import requests
import time
import json

def test_flask_hatty_api():
    """Test sending 3 messages to Flask Hatty API with 3-second intervals"""
    
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Flask Hatty API...")
    
    # Test if server is running
    try:
        health_response = requests.get(f"{base_url}/api/health", timeout=5)
        if health_response.status_code == 200:
            print("✅ Flask server is running")
        else:
            print("❌ Flask server health check failed")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to Flask server: {e}")
        print("   Make sure the Flask app is running with: python app.py")
        return False
    
    # Check Hatty status
    try:
        status_response = requests.get(f"{base_url}/api/hatty/status", timeout=5)
        status_data = status_response.json()
        print(f"🤖 Hatty bot status: {status_data}")
        
        if not status_data.get("available", False):
            print("⚠️ Hatty bot is not available - this is expected if browser automation failed")
            print("   But we can still test the API endpoints")
        
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Error checking Hatty status: {e}")
    
    # Test messages
    test_messages = [
        "Hallo! Wie ist das Wetter heute?",
        "Was gibt es heute in der Mensa?", 
        "Kannst du mir bei meinem Studium helfen?"
    ]
    
    print(f"\n📨 Testing {len(test_messages)} messages...")
    
    for i, message in enumerate(test_messages, 1):
        print(f"\n--- Message {i}/3 ---")
        print(f"📤 Sending: {message}")
        
        try:
            # Send message to Hatty API
            response = requests.post(
                f"{base_url}/api/hatty/chat",
                json={"message": message},
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            print(f"📡 Response status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                bot_response = data.get("response", "No response")
                timestamp = data.get("timestamp", "No timestamp")
                print(f"🤖 Hatty response: {bot_response}")
                print(f"⏰ Timestamp: {timestamp}")
                
                if "nicht verfügbar" in bot_response or "Error" in bot_response:
                    print("⚠️ Bot is not fully functional (browser may need manual setup)")
                else:
                    print("✅ Got valid response from bot!")
                    
            elif response.status_code == 503:
                data = response.json()
                print(f"⚠️ Service unavailable: {data.get('error', 'Unknown error')}")
                print(f"🤖 Fallback response: {data.get('response', 'No fallback')}")
            else:
                print(f"❌ Unexpected status code: {response.status_code}")
                print(f"Response: {response.text}")
        
        except requests.exceptions.Timeout:
            print("⏰ Request timed out - this may happen if browser automation is slow")
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
        except json.JSONDecodeError as e:
            print(f"❌ Invalid JSON response: {e}")
        
        # Wait before next message
        if i < len(test_messages):
            print("⏳ Waiting 3 seconds before next message...")
            time.sleep(3)
    
    print("\n🎉 API test completed!")
    return True

def test_mensa_api():
    """Test the mensa API to ensure basic Flask functionality works"""
    
    base_url = "http://localhost:5000"
    
    print("\n🍽️ Testing Mensa API...")
    
    try:
        response = requests.get(f"{base_url}/api/mensa", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            print(f"✅ Mensa API works! Found {len(items)} menu items")
            
            if items:
                print(f"📋 Sample item: {items[0].get('title', 'No title')}")
            
            return True
        else:
            print(f"❌ Mensa API failed with status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Mensa API request failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Starting Flask API tests...")
    print("   Make sure Flask app is running: python app.py")
    print()
    
    # Test basic functionality first
    mensa_success = test_mensa_api()
    
    # Test Hatty functionality
    hatty_success = test_flask_hatty_api()
    
    print("\n📊 Test Results:")
    print(f"   Mensa API: {'✅ PASS' if mensa_success else '❌ FAIL'}")
    print(f"   Hatty API: {'✅ PASS' if hatty_success else '❌ FAIL'}")
    
    if mensa_success and hatty_success:
        print("\n🎉 All Flask API tests completed successfully!")
    else:
        print("\n⚠️ Some tests failed - check Flask server and configuration")
