@echo off
echo Starting CampusHub Application...
echo.
echo This will start both the frontend and backend automatically.
echo Frontend will be available at: http://localhost:5173 (or similar)
echo Backend API will be available at: http://localhost:5000
echo.
echo The Hatty chatbot will launch automatically with a browser window.
echo If prompted, you can manually log into Google AI Studio for enhanced functionality.
echo.
pause
npm run dev
