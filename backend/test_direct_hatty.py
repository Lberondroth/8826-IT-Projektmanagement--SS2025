"""
Direct test of the Hatty implementation
"""
import sys
import os
from pathlib import Path

# Add the backend directory to the path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

from hatty_gemini import get_hatty_instance

def test_direct_chat():
    """Test direct chat with Hatty"""
    print("🔧 Testing direct Hatty communication...")
    
    try:
        # Get Hatty instance
        hatty = get_hatty_instance()
        
        if not hatty:
            print("❌ Failed to get Hatty instance")
            return False
        
        # Test messages
        test_messages = [
            "Hallo Hatty!",
            "Wer bist du?",
            "Erzähl mir über die HSRW",
            "Was sind die Standorte der Hochschule?"
        ]
        
        for i, message in enumerate(test_messages, 1):
            print(f"\n🔸 Test {i}: {message}")
            response = hatty.send_message(message)
            print(f"📥 Response: {response}")
            
            if not response or response.strip() == "":
                print(f"⚠️  Empty response for message: {message}")
                return False
            
            if not response.startswith("Hatty:"):
                print(f"⚠️  Response doesn't start with 'Hatty:': {response}")
                return False
        
        print("\n✅ All direct tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ Error in direct test: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("🧪 Direct Hatty Test")
    print("=" * 50)
    
    if test_direct_chat():
        print("\n🎉 Direct Hatty implementation is working correctly!")
    else:
        print("\n❌ Direct Hatty test failed!")
