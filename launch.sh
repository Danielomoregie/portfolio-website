#!/bin/bash

# Daniel Omoregie Portfolio Launcher
# This script starts the local server and opens the website automatically

echo "🚀 Starting Daniel Omoregie Portfolio..."
echo "========================================"

# Kill any existing server on port 8080
echo "🔍 Checking for existing server..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Start the server in the background
echo "🌐 Starting local server on port 8080..."
python3 -m http.server 8080 &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server started successfully!"
    echo "🌍 Opening website in your default browser..."
    
    # Open the website
    if command -v open >/dev/null 2>&1; then
        # macOS
        open http://localhost:8080
    elif command -v xdg-open >/dev/null 2>&1; then
        # Linux
        xdg-open http://localhost:8080
    elif command -v start >/dev/null 2>&1; then
        # Windows
        start http://localhost:8080
    else
        echo "❌ Could not automatically open browser"
        echo "🌐 Please manually open: http://localhost:8080"
    fi
    
    echo ""
    echo "🎉 Portfolio is now running!"
    echo "📍 Local URL: http://localhost:8080"
    echo "📱 Mobile URL: http://$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1):8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    
    # Keep the script running and show server output
    wait $SERVER_PID
else
    echo "❌ Failed to start server"
    echo "🔧 Please check if port 8080 is available"
    exit 1
fi