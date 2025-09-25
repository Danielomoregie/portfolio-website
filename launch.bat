@echo off
REM Daniel Omoregie Portfolio Launcher for Windows
REM This script starts the local server and opens the website automatically

echo 🚀 Starting Daniel Omoregie Portfolio...
echo ========================================

REM Kill any existing server on port 8080
echo 🔍 Checking for existing server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /f /pid %%a 2>nul

REM Start the server
echo 🌐 Starting local server on port 8080...
start /b python -m http.server 8080

REM Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 3 /nobreak >nul

REM Open the website
echo 🌍 Opening website in your default browser...
start http://localhost:8080

echo.
echo 🎉 Portfolio is now running!
echo 📍 Local URL: http://localhost:8080
echo.
echo Press any key to stop the server...
pause >nul

REM Kill the server when done
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /f /pid %%a 2>nul
