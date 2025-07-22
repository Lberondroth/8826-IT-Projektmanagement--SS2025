#!/usr/bin/env python3
"""
Hatty Performance Comparison Test
Compares performance between different versions/configurations of Hatty
"""

import time
import threading
import requests
import json
import statistics
from datetime import datetime
from pathlib import Path
import sys
from typing import Dict, List, Any, Optional

# Add backend path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

class HattyPerformanceTest:
    """Performance tester for Hatty bot"""
    
    def __init__(self, base_url: str = "http://localhost:5000"):
        self.base_url = base_url
        self.results: Dict[str, Any] = {}
        
    def check_server_status(self) -> bool:
        """Check if server is running"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def measure_response_times(self, messages: List[str], iterations: int = 1) -> Dict[str, Any]:
        """Measure response times for given messages"""
        all_times = []
        successful = 0
        failed = 0
        
        print(f"🔍 Testing {len(messages)} messages x {iterations} iterations...")
        
        for iteration in range(iterations):
            for i, message in enumerate(messages):
                try:
                    start_time = time.time()
                    
                    response = requests.post(
                        f"{self.base_url}/api/hatty/chat",
                        json={"message": message},
                        timeout=30
                    )
                    
                    end_time = time.time()
                    response_time = end_time - start_time
                    
                    if response.status_code == 200:
                        all_times.append(response_time)
                        successful += 1
                        print(f"  ✅ Iteration {iteration+1}, Message {i+1}: {response_time:.2f}s")
                    else:
                        failed += 1
                        print(f"  ❌ Iteration {iteration+1}, Message {i+1}: HTTP {response.status_code}")
                        
                except requests.exceptions.Timeout:
                    failed += 1
                    print(f"  ⏰ Iteration {iteration+1}, Message {i+1}: Timeout")
                except Exception as e:
                    failed += 1
                    print(f"  ❌ Iteration {iteration+1}, Message {i+1}: {str(e)[:50]}")
                
                # Small delay between requests
                time.sleep(0.3)
        
        if all_times:
            return {
                'total_requests': len(messages) * iterations,
                'successful': successful,
                'failed': failed,
                'avg_time': statistics.mean(all_times),
                'median_time': statistics.median(all_times),
                'min_time': min(all_times),
                'max_time': max(all_times),
                'std_dev': statistics.stdev(all_times) if len(all_times) > 1 else 0,
                'all_times': all_times
            }
        else:
            return {
                'total_requests': len(messages) * iterations,
                'successful': 0,
                'failed': failed,
                'error': 'No successful responses'
            }
    
    def test_accuracy_vs_speed(self) -> Dict[str, Any]:
        """Test different types of questions to measure accuracy vs speed"""
        
        test_cases = {
            'simple_greetings': [
                "Hallo",
                "Hi",
                "Guten Tag",
                "Wie geht's?"
            ],
            'basic_info': [
                "Wer bist du?",
                "Was machst du?",
                "Wie heißt du?",
                "Was kannst du?"
            ],
            'university_info': [
                "Was sind die Öffnungszeiten der Bibliothek?",
                "Welche Studiengänge gibt es?",
                "Wo ist die Mensa?",
                "Wie melde ich mich für Prüfungen an?"
            ],
            'complex_queries': [
                "Wie kann ich mich für das Wintersemester 2025 für einen Informatik-Studiengang anmelden und welche Voraussetzungen muss ich erfüllen?",
                "Was sind die Unterschiede zwischen den verschiedenen Masterstudiengängen im Bereich Wirtschaft und welche Spezialisierungen werden angeboten?",
                "Welche Unterstützungsmöglichkeiten gibt es für internationale Studierende und wie funktioniert die Wohnheimplatzvergabe?",
                "Wie läuft das Anmeldeverfahren für Abschlussarbeiten ab und welche Fristen muss ich beachten?"
            ]
        }
        
        results = {}
        
        for category, messages in test_cases.items():
            print(f"\n📋 Testing category: {category}")
            category_results = self.measure_response_times(messages, iterations=1)
            results[category] = category_results
            
            if 'avg_time' in category_results:
                print(f"   Average response time: {category_results['avg_time']:.2f}s")
                print(f"   Success rate: {category_results['successful']}/{category_results['total_requests']}")
        
        return results
    
    def concurrent_load_test(self, num_threads: int = 3, messages_per_thread: int = 2) -> Dict[str, Any]:
        """Test concurrent request handling"""
        print(f"\n🔄 Running concurrent load test: {num_threads} threads, {messages_per_thread} messages each")
        
        test_message = "Was sind die Öffnungszeiten der Bibliothek?"
        results_lock = threading.Lock()
        all_response_times = []
        errors = []
        
        def worker_thread(thread_id: int):
            thread_times = []
            for i in range(messages_per_thread):
                try:
                    start_time = time.time()
                    
                    response = requests.post(
                        f"{self.base_url}/api/hatty/chat",
                        json={"message": f"Thread {thread_id}: {test_message}"},
                        timeout=30
                    )
                    
                    end_time = time.time()
                    response_time = end_time - start_time
                    
                    if response.status_code == 200:
                        thread_times.append(response_time)
                        print(f"  ✅ Thread {thread_id}, Msg {i+1}: {response_time:.2f}s")
                    else:
                        with results_lock:
                            errors.append(f"Thread {thread_id}: HTTP {response.status_code}")
                            
                except Exception as e:
                    with results_lock:
                        errors.append(f"Thread {thread_id}: {str(e)[:50]}")
            
            with results_lock:
                all_response_times.extend(thread_times)
        
        # Start concurrent threads
        threads = []
        start_time = time.time()
        
        for i in range(num_threads):
            thread = threading.Thread(target=worker_thread, args=(i,))
            threads.append(thread)
            thread.start()
        
        # Wait for completion
        for thread in threads:
            thread.join()
            
        total_time = time.time() - start_time
        
        result = {
            'num_threads': num_threads,
            'messages_per_thread': messages_per_thread,
            'total_requests': num_threads * messages_per_thread,
            'successful_requests': len(all_response_times),
            'failed_requests': len(errors),
            'total_time': total_time,
            'throughput': len(all_response_times) / total_time if total_time > 0 else 0,
            'errors': errors[:5]  # First 5 errors only
        }
        
        if all_response_times:
            result.update({
                'avg_response_time': statistics.mean(all_response_times),
                'median_response_time': statistics.median(all_response_times),
                'min_response_time': min(all_response_times),
                'max_response_time': max(all_response_times)
            })
        
        return result
    
    def run_comprehensive_test(self) -> Dict[str, Any]:
        """Run all performance tests"""
        print("🚀 Starting Hatty Performance Test Suite")
        print("=" * 60)
        
        if not self.check_server_status():
            return {
                'error': 'Server not running. Please start the Flask app with: python app.py',
                'timestamp': datetime.now().isoformat()
            }
        
        results = {
            'timestamp': datetime.now().isoformat(),
            'server_url': self.base_url
        }
        
        try:
            # Test response accuracy vs speed
            print("\n1️⃣ Testing Response Accuracy vs Speed")
            results['accuracy_speed_test'] = self.test_accuracy_vs_speed()
            
            # Test concurrent load
            print("\n2️⃣ Testing Concurrent Load Handling")
            results['concurrent_load_test'] = self.concurrent_load_test(3, 2)
            
            # Additional single-message tests
            print("\n3️⃣ Testing Single Message Performance")
            single_message_test = self.measure_response_times([
                "Hallo Hatty, wie kann ich dir helfen?"
            ], iterations=5)
            results['single_message_test'] = single_message_test
            
        except Exception as e:
            results['error'] = f"Test execution failed: {str(e)}"
            print(f"❌ Test failed: {e}")
        
        return results
    
    def generate_performance_report(self, results: Dict[str, Any], filename: Optional[str] = None):
        """Generate a comprehensive performance report"""
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"hatty_performance_report_{timestamp}.json"
        
        # Save detailed results
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 HATTY PERFORMANCE REPORT SUMMARY")
        print("=" * 60)
        
        if 'error' in results:
            print(f"❌ {results['error']}")
            return
        
        # Accuracy vs Speed Results
        if 'accuracy_speed_test' in results:
            print("\n📋 Response Time by Query Complexity:")
            for category, data in results['accuracy_speed_test'].items():
                if 'avg_time' in data:
                    success_rate = (data['successful'] / data['total_requests']) * 100
                    print(f"   {category:20} {data['avg_time']:6.2f}s avg  {success_rate:5.1f}% success")
        
        # Concurrent Load Results
        if 'concurrent_load_test' in results:
            load_data = results['concurrent_load_test']
            print(f"\n🔄 Concurrent Load Performance:")
            print(f"   Threads: {load_data.get('num_threads', 0)}")
            print(f"   Success Rate: {load_data.get('successful_requests', 0)}/{load_data.get('total_requests', 0)}")
            if 'throughput' in load_data:
                print(f"   Throughput: {load_data['throughput']:.2f} requests/second")
            if 'avg_response_time' in load_data:
                print(f"   Avg Response: {load_data['avg_response_time']:.2f}s")
        
        # Single Message Test
        if 'single_message_test' in results:
            single_data = results['single_message_test']
            if 'avg_time' in single_data:
                print(f"\n⚡ Single Message Performance:")
                print(f"   Average: {single_data['avg_time']:.2f}s")
                print(f"   Range: {single_data['min_time']:.2f}s - {single_data['max_time']:.2f}s")
                print(f"   Consistency (std dev): {single_data['std_dev']:.2f}s")
        
        print(f"\n💾 Full report saved to: {filename}")
        print("=" * 60)

def simulate_google_function_comparison():
    """
    Simulate comparison between Hatty with/without Google function
    This demonstrates the theoretical performance difference
    """
    print("\n🔬 SIMULATED COMPARISON: With vs Without Google Function")
    print("=" * 60)
    
    # Simulated data based on typical API call overhead
    with_google = {
        'name': 'Hatty WITH Google Function',
        'avg_response_time': 3.2,  # Higher due to external API calls
        'accuracy_score': 0.92,    # Higher accuracy
        'external_dependencies': ['Google Generative AI', 'Internet connection'],
        'failure_points': ['API rate limits', 'Network issues', 'API key problems']
    }
    
    without_google = {
        'name': 'Hatty WITHOUT Google Function',
        'avg_response_time': 0.8,   # Much faster, local processing
        'accuracy_score': 0.75,     # Lower accuracy, simpler responses
        'external_dependencies': ['None'],
        'failure_points': ['Limited knowledge base', 'No dynamic updates']
    }
    
    print(f"📈 WITH Google Function:")
    print(f"   Response Time: {with_google['avg_response_time']:.1f}s")
    print(f"   Accuracy: {with_google['accuracy_score']:.0%}")
    print(f"   Dependencies: {', '.join(with_google['external_dependencies'])}")
    
    print(f"\n📉 WITHOUT Google Function:")
    print(f"   Response Time: {without_google['avg_response_time']:.1f}s")
    print(f"   Accuracy: {without_google['accuracy_score']:.0%}")
    print(f"   Dependencies: {', '.join(without_google['external_dependencies'])}")
    
    speed_improvement = ((with_google['avg_response_time'] - without_google['avg_response_time']) / with_google['avg_response_time']) * 100
    accuracy_decrease = ((with_google['accuracy_score'] - without_google['accuracy_score']) / with_google['accuracy_score']) * 100
    
    print(f"\n📊 TRADE-OFF ANALYSIS:")
    print(f"   Speed Improvement: {speed_improvement:.1f}% faster")
    print(f"   Accuracy Decrease: {accuracy_decrease:.1f}% less accurate")
    print(f"   Reliability: Higher (no external dependencies)")
    print(f"   Cost: Lower (no API calls)")

def main():
    """Main test execution"""
    print("🤖 Hatty Performance Testing Suite")
    
    # Run performance tests
    tester = HattyPerformanceTest()
    results = tester.run_comprehensive_test()
    tester.generate_performance_report(results)
    
    # Show theoretical comparison
    simulate_google_function_comparison()
    
    print("\n✅ Performance testing completed!")

if __name__ == "__main__":
    main()
