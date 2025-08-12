# CampusHub Application Startup Script
Write-Host "🎓 Starting CampusHub Application..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start both the frontend and backend automatically." -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:5173 (or similar)" -ForegroundColor Yellow
Write-Host "Backend API will be available at: http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "The Hatty chatbot will launch automatically with a browser window." -ForegroundColor Magenta
Write-Host "If prompted, you can manually log into Google AI Studio for enhanced functionality." -ForegroundColor Magenta
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

npm run dev
