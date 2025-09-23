#!/bin/bash

# Daniel Omoregie Portfolio Website Launcher
# This script starts a local server to view the portfolio website

echo "🚀 Starting Daniel Omoregie's Portfolio Website..."
echo "📍 Location: $(pwd)"
echo ""

# Function to try different ports
try_port() {
    local port=$1
    local command=$2
    echo "🌐 Trying port $port..."
    
    # Check if port is available
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $port is already in use, trying next port..."
        return 1
    fi
    
    echo "✅ Starting server on port $port"
    echo "🌐 Server will be available at: http://localhost:$port"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    
    eval $command
    return 0
}

# Kill any existing Python servers
pkill -f "python.*http.server" 2>/dev/null

# Try different ports and methods
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    for port in 3000 8000 8080 9000; do
        if try_port $port "python3 -m http.server $port"; then
            exit 0
        fi
    done
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    for port in 3000 8000 8080 9000; do
        if try_port $port "python -m http.server $port"; then
            exit 0
        fi
    done
elif command -v node &> /dev/null; then
    echo "✅ Node.js found, using custom server"
    for port in 3000 8000 8080 9000; do
        if try_port $port "node server.js"; then
            exit 0
        fi
    done
else
    echo "❌ No suitable server found."
    echo "💡 Options:"
    echo "   1. Install Python: brew install python3"
    echo "   2. Install Node.js: brew install node"
    echo "   3. Use VS Code Live Server extension"
    echo "   4. Open index.html directly in your browser"
    echo "   5. Use any other local server tool"
    exit 1
fi

echo "❌ Could not start server on any available port"
echo "💡 Try opening index.html directly in your browser"
