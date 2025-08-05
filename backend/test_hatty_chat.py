import requests
import json

# Test the Hatty chat endpoint
def test_hatty_chat():
    url = "http://localhost:5000/api/hatty/chat"
    
    # Test message
    message = "Hallo Hatty, wie geht es dir?"
    
    # Send POST request
    payload = {"message": message}
    headers = {"Content-Type": "application/json"}
    
    print(f"Sending message: {message}")
    
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers, timeout=60)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Hatty Response: {result.get('response', 'No response')}")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            
    except requests.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_hatty_chat()
