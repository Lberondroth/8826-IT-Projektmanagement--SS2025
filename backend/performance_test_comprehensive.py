#!/usr/bin/env python3
"""
Comprehensive Performance Testing Suite for Hatty and App Components
Tests response times, memory usage, and throughput for different scenarios
"""

import time
import threading
import requests
import psutil
import os
import sys
import json
import statistics
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple, Any
import gc
import tracemalloc

# Add backend path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

class PerformanceMonitor:
    """Monitor system resources during tests"""
    
    def __init__(self):
        self.process = psutil.Process()
        self.monitoring = False
        self.data_points = []
        
    def start_monitoring(self):
        """Start resource monitoring in background thread"""
        self.monitoring = True
        self.data_points = []
        threading.Thread(target=self._monitor_loop, daemon=True).start()
        
    def stop_monitoring(self):
        """Stop resource monitoring"""
        self.monitoring = False
        time.sleep(0.1)  # Give monitor thread time to finish
        
    def _monitor_loop(self):
        """Background monitoring loop"""
        while self.monitoring:
            try:
                data_point = {
                    'timestamp': time.time(),
                    'cpu_percent': self.process.cpu_percent(),
                    'memory_mb': self.process.memory_info().rss / 1024 / 1024,
                    'memory_percent': self.process.memory_percent()
                }
                self.data_points.append(data_point)
                time.sleep(0.1)  # Sample every 100ms
            except:
                break
                
    def get_stats(self) -> Dict[str, Any]:
        """Get monitoring statistics"""
        if not self.data_points:
            return {}
            
        cpu_values = [dp['cpu_percent'] for dp in self.data_points]
        memory_values = [dp['memory_mb'] for dp in self.data_points]
        
        return {
            'cpu_avg': statistics.mean(cpu_values),
            'cpu_max': max(cpu_values),
            'memory_avg': statistics.mean(memory_values),
            'memory_max': max(memory_values),
            'samples': len(self.data_points)
        }

class PerformanceTestSuite:
    """Main performance test suite"""
    
    def __init__(self):
        self.results = {}
        self.monitor = PerformanceMonitor()
        self.base_url = "http://localhost:5000"
        
    def test_hatty_response_time(self, num_messages: int = 10) -> Dict[str, Any]:
        """Test Hatty response times with various messages"""
        print(f"\n🚀 Testing Hatty response times ({num_messages} messages)...")
        
        test_messages = [
            "Hallo, wer bist du?",
            "Was sind die Öffnungszeiten der Bibliothek?",
            "Welche Studiengänge gibt es?",
            "Wie melde ich mich für Prüfungen an?",
            "Wo ist die Mensa?",
            "Wann ist die nächste Vorlesung?",
            "Gibt es WLAN auf dem Campus?",
            "Wie kann ich mich für Kurse anmelden?",
            "Was kostet das Studium?",
            "Wo finde ich Hilfe bei Problemen?"
        ]
        
        response_times = []
        successful_requests = 0
        failed_requests = 0
        
        self.monitor.start_monitoring()
        
        for i in range(num_messages):
            message = test_messages[i % len(test_messages)]
            
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
                    response_times.append(response_time)
                    successful_requests += 1
                    print(f"  ✅ Message {i+1}: {response_time:.2f}s")
                else:
                    failed_requests += 1
                    print(f"  ❌ Message {i+1}: HTTP {response.status_code}")
                    
            except requests.exceptions.Timeout:
                failed_requests += 1
                print(f"  ⏰ Message {i+1}: Timeout (>30s)")
            except Exception as e:
                failed_requests += 1
                print(f"  ❌ Message {i+1}: Error - {e}")
                
            # Small delay to prevent overwhelming
            time.sleep(0.5)
        
        self.monitor.stop_monitoring()
        system_stats = self.monitor.get_stats()
        
        if response_times:
            stats = {
                'total_messages': num_messages,
                'successful_requests': successful_requests,
                'failed_requests': failed_requests,
                'avg_response_time': statistics.mean(response_times),
                'median_response_time': statistics.median(response_times),
                'min_response_time': min(response_times),
                'max_response_time': max(response_times),
                'std_response_time': statistics.stdev(response_times) if len(response_times) > 1 else 0,
                'system_stats': system_stats
            }
        else:
            stats = {
                'total_messages': num_messages,
                'successful_requests': 0,
                'failed_requests': failed_requests,
                'error': 'No successful responses'
            }
            
        return stats
    
    def test_concurrent_requests(self, num_concurrent: int = 5, num_requests_per_thread: int = 3) -> Dict[str, Any]:
        """Test concurrent request handling"""
        print(f"\n🔄 Testing concurrent requests ({num_concurrent} threads, {num_requests_per_thread} requests each)...")
        
        results_lock = threading.Lock()
        all_response_times = []
        all_errors = []
        
        def worker_thread(thread_id: int):
            thread_times = []
            thread_errors = []
            
            for i in range(num_requests_per_thread):
                try:
                    start_time = time.time()
                    
                    response = requests.post(
                        f"{self.base_url}/api/hatty/chat",
                        json={"message": f"Thread {thread_id}: Nachricht {i+1}"},
                        timeout=30
                    )
                    
                    end_time = time.time()
                    response_time = end_time - start_time
                    
                    if response.status_code == 200:
                        thread_times.append(response_time)
                        print(f"  ✅ Thread {thread_id}, Request {i+1}: {response_time:.2f}s")
                    else:
                        thread_errors.append(f"Thread {thread_id}, Request {i+1}: HTTP {response.status_code}")
                        
                except Exception as e:
                    thread_errors.append(f"Thread {thread_id}, Request {i+1}: {e}")
            
            with results_lock:
                all_response_times.extend(thread_times)
                all_errors.extend(thread_errors)
        
        self.monitor.start_monitoring()
        
        # Start all threads
        threads = []
        start_time = time.time()
        
        for i in range(num_concurrent):
            thread = threading.Thread(target=worker_thread, args=(i,))
            threads.append(thread)
            thread.start()
        
        # Wait for all threads to complete
        for thread in threads:
            thread.join()
            
        end_time = time.time()
        total_time = end_time - start_time
        
        self.monitor.stop_monitoring()
        system_stats = self.monitor.get_stats()
        
        stats = {
            'concurrent_threads': num_concurrent,
            'requests_per_thread': num_requests_per_thread,
            'total_requests': num_concurrent * num_requests_per_thread,
            'successful_requests': len(all_response_times),
            'failed_requests': len(all_errors),
            'total_time': total_time,
            'requests_per_second': (len(all_response_times) / total_time) if total_time > 0 else 0,
            'system_stats': system_stats,
            'errors': all_errors[:5]  # First 5 errors
        }
        
        if all_response_times:
            stats.update({
                'avg_response_time': statistics.mean(all_response_times),
                'median_response_time': statistics.median(all_response_times),
                'min_response_time': min(all_response_times),
                'max_response_time': max(all_response_times)
            })
        
        return stats
    
    def test_memory_usage(self) -> Dict[str, Any]:
        """Test memory usage during operation"""
        print("\n💾 Testing memory usage...")
        
        tracemalloc.start()
        initial_memory = self.monitor.process.memory_info().rss / 1024 / 1024
        
        # Send several messages to load memory
        messages = [
            "Was sind die Öffnungszeiten?",
            "Welche Studiengänge gibt es?",
            "Wo ist die Bibliothek?",
            "Wie melde ich mich an?",
            "Was kostet das Studium?"
        ]
        
        for i, message in enumerate(messages):
            try:
                response = requests.post(
                    f"{self.base_url}/api/hatty/chat",
                    json={"message": message},
                    timeout=30
                )
                current_memory = self.monitor.process.memory_info().rss / 1024 / 1024
                print(f"  📊 After message {i+1}: {current_memory:.1f} MB")
            except:
                pass
        
        # Force garbage collection
        gc.collect()
        final_memory = self.monitor.process.memory_info().rss / 1024 / 1024
        
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        return {
            'initial_memory_mb': initial_memory,
            'final_memory_mb': final_memory,
            'memory_increase_mb': final_memory - initial_memory,
            'python_current_mb': current / 1024 / 1024,
            'python_peak_mb': peak / 1024 / 1024
        }
    
    def test_api_endpoints(self) -> Dict[str, Any]:
        """Test all API endpoints performance"""
        print("\n🌐 Testing API endpoints...")
        
        endpoints = [
            ('/api/health', 'GET'),
            ('/api/hatty/status', 'GET'),
            ('/api/campusinfo', 'GET'),
        ]
        
        results = {}
        
        for endpoint, method in endpoints:
            try:
                start_time = time.time()
                
                if method == 'GET':
                    response = requests.get(f"{self.base_url}{endpoint}", timeout=10)
                else:
                    response = requests.post(f"{self.base_url}{endpoint}", timeout=10)
                
                end_time = time.time()
                response_time = end_time - start_time
                
                results[endpoint] = {
                    'method': method,
                    'status_code': response.status_code,
                    'response_time': response_time,
                    'success': response.status_code == 200
                }
                
                print(f"  ✅ {method} {endpoint}: {response_time:.3f}s (HTTP {response.status_code})")
                
            except Exception as e:
                results[endpoint] = {
                    'method': method,
                    'error': str(e),
                    'success': False
                }
                print(f"  ❌ {method} {endpoint}: Error - {e}")
        
        return results
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run complete performance test suite"""
        print("🧪 Starting Comprehensive Performance Test Suite")
        print("=" * 60)
        
        # Check if server is running
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=5)
            if response.status_code != 200:
                return {'error': 'Server not running or not healthy'}
        except:
            return {'error': 'Cannot connect to server. Make sure Flask app is running on localhost:5000'}
        
        test_results = {
            'timestamp': datetime.now().isoformat(),
            'server_url': self.base_url
        }
        
        try:
            # Test API endpoints first
            test_results['api_endpoints'] = self.test_api_endpoints()
            
            # Test response times
            test_results['response_times'] = self.test_hatty_response_time(10)
            
            # Test concurrent requests
            test_results['concurrent_requests'] = self.test_concurrent_requests(3, 2)
            
            # Test memory usage
            test_results['memory_usage'] = self.test_memory_usage()
            
        except Exception as e:
            test_results['error'] = f"Test suite failed: {e}"
            print(f"❌ Test suite failed: {e}")
        
        return test_results
    
    def generate_report(self, results: Dict[str, Any], filename: str = None):
        """Generate performance test report"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"performance_report_{timestamp}.json"
        
        # Save detailed results to JSON
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        # Print summary report
        print("\n" + "=" * 60)
        print("📊 PERFORMANCE TEST SUMMARY")
        print("=" * 60)
        
        if 'error' in results:
            print(f"❌ Test failed: {results['error']}")
            return
        
        # API Endpoints Summary
        if 'api_endpoints' in results:
            endpoints = results['api_endpoints']
            successful_endpoints = sum(1 for ep in endpoints.values() if ep.get('success', False))
            print(f"\n🌐 API Endpoints: {successful_endpoints}/{len(endpoints)} successful")
            
        # Response Times Summary
        if 'response_times' in results:
            rt = results['response_times']
            if 'avg_response_time' in rt:
                print(f"\n⏱️  Response Times:")
                print(f"   Average: {rt['avg_response_time']:.2f}s")
                print(f"   Median:  {rt['median_response_time']:.2f}s")
                print(f"   Range:   {rt['min_response_time']:.2f}s - {rt['max_response_time']:.2f}s")
                print(f"   Success: {rt['successful_requests']}/{rt['total_messages']}")
        
        # Concurrent Requests Summary
        if 'concurrent_requests' in results:
            cr = results['concurrent_requests']
            print(f"\n🔄 Concurrent Requests:")
            print(f"   Threads: {cr.get('concurrent_threads', 0)}")
            print(f"   Success: {cr.get('successful_requests', 0)}/{cr.get('total_requests', 0)}")
            if 'requests_per_second' in cr:
                print(f"   Throughput: {cr['requests_per_second']:.2f} req/s")
        
        # Memory Usage Summary
        if 'memory_usage' in results:
            mu = results['memory_usage']
            print(f"\n💾 Memory Usage:")
            print(f"   Initial: {mu.get('initial_memory_mb', 0):.1f} MB")
            print(f"   Final:   {mu.get('final_memory_mb', 0):.1f} MB")
            print(f"   Increase: {mu.get('memory_increase_mb', 0):.1f} MB")
        
        print(f"\n📄 Detailed results saved to: {filename}")
        print("=" * 60)

def main():
    """Main test execution"""
    print("🚀 Starting Performance Testing Suite")
    
    suite = PerformanceTestSuite()
    results = suite.run_all_tests()
    suite.generate_report(results)

if __name__ == "__main__":
    main()
