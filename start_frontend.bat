@echo off
echo Starting CampusHub Frontend...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js 16 or later
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)

REM Start the development server
echo Starting frontend development server...
npm run dev
