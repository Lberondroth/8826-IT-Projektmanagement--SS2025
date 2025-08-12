@echo off
echo Starting CampusHub Backend with Browser-based Hatty...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8 or later
    pause
    exit /b 1
)

echo Found Python installation

REM Change to backend directory
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Start the backend server
echo.
echo Starting backend server with browser-based Hatty...
echo Note: This will open a browser window for the AI chatbot.
echo The browser window is required for Hatty to function.
echo.
python app.py
