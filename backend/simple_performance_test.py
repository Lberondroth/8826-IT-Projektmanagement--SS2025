#!/usr/bin/env python3
"""
Simple Hatty Load Test
Tests response times and throughput
"""

import time
import requests
import json
from datetime import datetime

def test_hatty_speed():
    """Test Hatty response speed"""
    base_url = "http://localhost:5000"
    
    print("🚀 Testing Hatty Speed Performance")
    print("=" * 50)
    
    # Check server
    try:
        response = requests.get(f"{base_url}/api/health", timeout=5)
        if response.status_code != 200:
            print("❌ Server not healthy")
            return
    except:
        print("❌ Server not running. Start with: python app.py")
        return
    
    # Test messages
    messages = [
        "Hallo",
        "Wer bist du?",
        "Was sind die Öffnungszeiten?",
        "Welche Studiengänge gibt es?",
        "Wo ist die Mensa?"
    ]
    
    times = []
    successful = 0
    
    for i, message in enumerate(messages):
        print(f"\n📤 Testing message {i+1}: {message}")
        
        try:
            start = time.time()
            
            response = requests.post(
                f"{base_url}/api/hatty/chat",
                json={"message": message},
                timeout=30
            )
            
            end = time.time()
            duration = end - start
            
            if response.status_code == 200:
                times.append(duration)
                successful += 1
                print(f"✅ Response time: {duration:.2f} seconds")
                
                # Show first 100 chars of response
                try:
                    response_data = response.json()
                    reply = response_data.get('response', 'No response')[:100]
                    print(f"📥 Response: {reply}...")
                except:
                    print("📥 Response: (Could not parse)")
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                
        except requests.Timeout:
            print("⏰ Request timed out (>30s)")
        except Exception as e:
            print(f"❌ Error: {e}")
        
        # Small delay
        time.sleep(1)
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 SPEED TEST SUMMARY")
    print("=" * 50)
    
    if times:
        avg_time = sum(times) / len(times)
        min_time = min(times)
        max_time = max(times)
        
        print(f"Messages tested: {len(messages)}")
        print(f"Successful: {successful}")
        print(f"Average response time: {avg_time:.2f}s")
        print(f"Fastest response: {min_time:.2f}s")
        print(f"Slowest response: {max_time:.2f}s")
        
        # Performance rating
        if avg_time < 2.0:
            rating = "🟢 EXCELLENT"
        elif avg_time < 4.0:
            rating = "🟡 GOOD"
        else:
            rating = "🔴 NEEDS IMPROVEMENT"
            
        print(f"Performance rating: {rating}")
    else:
        print("❌ No successful responses")

def test_accuracy_comparison():
    """Simulate accuracy comparison between versions"""
    print("\n🎯 ACCURACY COMPARISON SIMULATION")
    print("=" * 50)
    
    # Simulate different response qualities
    scenarios = [
        {
            'version': 'WITH Google Generative AI',
            'speed': 3.5,
            'accuracy': 95,
            'features': ['Dynamic responses', 'Up-to-date info', 'Natural language'],
            'issues': ['Slower', 'API dependency', 'Costs money']
        },
        {
            'version': 'WITHOUT Google (Simple responses)',
            'speed': 0.8,
            'accuracy': 70,
            'features': ['Very fast', 'No external deps', 'Always available'],
            'issues': ['Limited knowledge', 'Repetitive', 'Less natural']
        }
    ]
    
    for scenario in scenarios:
        print(f"\n📋 {scenario['version']}:")
        print(f"   ⚡ Speed: {scenario['speed']:.1f}s average")
        print(f"   🎯 Accuracy: {scenario['accuracy']}%")
        print(f"   ✅ Benefits: {', '.join(scenario['features'])}")
        print(f"   ⚠️  Drawbacks: {', '.join(scenario['issues'])}")
    
    speed_improvement = ((scenarios[0]['speed'] - scenarios[1]['speed']) / scenarios[0]['speed']) * 100
    accuracy_loss = scenarios[0]['accuracy'] - scenarios[1]['accuracy']
    
    print(f"\n📈 TRADE-OFF ANALYSIS:")
    print(f"   Speed gained: {speed_improvement:.0f}% faster without Google API")
    print(f"   Accuracy lost: {accuracy_loss}% less accurate")
    print(f"   Best choice: Depends on use case!")

def stress_test():
    """Simple stress test"""
    base_url = "http://localhost:5000"
    
    print("\n💪 STRESS TEST (10 rapid requests)")
    print("=" * 50)
    
    message = "Schnelle Testfrage"
    times = []
    errors = 0
    
    for i in range(10):
        try:
            start = time.time()
            response = requests.post(
                f"{base_url}/api/hatty/chat",
                json={"message": f"{message} {i+1}"},
                timeout=15
            )
            end = time.time()
            
            if response.status_code == 200:
                times.append(end - start)
                print(f"✅ Request {i+1}: {end - start:.2f}s")
            else:
                errors += 1
                print(f"❌ Request {i+1}: HTTP {response.status_code}")
        except:
            errors += 1
            print(f"❌ Request {i+1}: Failed")
        
        time.sleep(0.2)  # Small delay
    
    if times:
        print(f"\n📊 Stress Test Results:")
        print(f"   Successful: {len(times)}/10")
        print(f"   Average time: {sum(times)/len(times):.2f}s")
        print(f"   System stability: {'Good' if errors <= 2 else 'Poor'}")

def main():
    """Run all tests"""
    test_hatty_speed()
    test_accuracy_comparison()
    stress_test()
    
    print(f"\n✅ Testing completed at {datetime.now().strftime('%H:%M:%S')}")

if __name__ == "__main__":
    main()
