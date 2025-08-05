#!/usr/bin/env python3
"""
Simple Playwright test to check browser functionality
"""

import sys
from pathlib import Path
import time

try:
    from playwright.sync_api import sync_playwright
    
    print("🧪 Testing Simple Playwright Browser Launch")
    print("=" * 50)
    
    with sync_playwright() as p:
        print("🚀 Starting Playwright...")
        
        # Try different browser launch methods
        browsers_to_try = [
            ("chromium", {"channel": "msedge"}),
            ("chromium", {}),
            ("firefox", {}),
        ]
        
        for browser_name, options in browsers_to_try:
            print(f"\n🌐 Trying {browser_name} with options: {options}")
            
            try:
                if browser_name == "chromium":
                    browser = p.chromium.launch(
                        headless=False,
                        **options
                    )
                elif browser_name == "firefox":
                    browser = p.firefox.launch(headless=False)
                
                print("✅ Browser launched successfully!")
                
                # Create a context and page
                context = browser.new_context()
                page = context.new_page()
                
                print("📄 Page created, navigating to Google...")
                page.goto("https://www.google.com", timeout=30000)
                
                print("✅ Navigation successful!")
                print(f"Final URL: {page.url}")
                
                # Wait a moment
                time.sleep(3)
                
                # Close browser
                browser.close()
                print("✅ Browser closed successfully!")
                
                # If we get here, this browser works
                print(f"🎉 SUCCESS: {browser_name} with {options} works!")
                break
                
            except Exception as e:
                print(f"❌ Failed with {browser_name}: {e}")
                continue
        else:
            print("❌ All browser attempts failed!")
            
except ImportError as e:
    print(f"❌ Playwright not available: {e}")
    print("💡 Try: pip install playwright")
    print("💡 Then: playwright install")
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 50)
print("Test completed. Press Enter to exit...")
input()
