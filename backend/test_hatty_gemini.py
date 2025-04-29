"""
Test script for the new Hatty Gemini implementation
"""
import sys
import os
from pathlib import Path

# Add the backend directory to the path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

try:
    from hatty_gemini import HattyBot, get_hatty_instance
    print("✅ Successfully imported Hatty Gemini components")
except ImportError as e:
    print(f"❌ Failed to import Hatty Gemini components: {e}")
    sys.exit(1)

def test_hatty_bot():
    """Test the Hatty bot functionality"""
    print("\n🧪 Testing Hatty Bot...")
    
    try:
        # Test instance creation
        print("Creating Hatty instance...")
        hatty = get_hatty_instance()
        
        if hatty is None:
            print("❌ Failed to create Hatty instance")
            return False
        
        print("✅ Hatty instance created successfully")
        
        # Test availability
        print("Checking Hatty availability...")
        is_available = hatty.is_available()
        print(f"✅ Hatty availability: {is_available}")
        
        # Test simple message
        print("Testing simple message...")
        response = hatty.send_message("Hallo, wer bist du?")
        print(f"📤 Sent: Hallo, wer bist du?")
        print(f"📥 Response: {response}")
        
        if response and "Hatty:" in response:
            print("✅ Response format looks correct")
        else:
            print("⚠️  Response format might be incorrect")
        
        # Test another message
        print("\nTesting follow-up message...")
        response2 = hatty.send_message("Kannst du mir über die Hochschule Rhein-Waal erzählen?")
        print(f"📤 Sent: Kannst du mir über die Hochschule Rhein-Waal erzählen?")
        print(f"📥 Response: {response2}")
        
        # Test conversation history
        print("\nTesting conversation history...")
        history = hatty.get_conversation_history()
        print(f"📜 Conversation history has {len(history)} exchanges")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing Hatty bot: {e}")
        return False

def test_environment():
    """Test environment variables and configuration"""
    print("\n🌍 Testing Environment...")
    
    # Check .env file
    env_file = backend_path / '.env'
    if env_file.exists():
        print("✅ .env file exists")
        
        # Check for API key
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            print(f"✅ GOOGLE_API_KEY found (length: {len(api_key)})")
        else:
            print("❌ GOOGLE_API_KEY not found in environment")
            return False
    else:
        print("❌ .env file not found")
        return False
    
    return True

if __name__ == "__main__":
    print("🚀 Starting Hatty Gemini Test Suite")
    print("=" * 50)
    
    # Test environment first
    if not test_environment():
        print("\n❌ Environment test failed")
        sys.exit(1)
    
    # Test Hatty bot
    if test_hatty_bot():
        print("\n✅ All tests passed!")
        print("🎉 Hatty Gemini implementation is working correctly!")
    else:
        print("\n❌ Some tests failed")
        print("⚠️  Please check the configuration and try again")
        sys.exit(1)
