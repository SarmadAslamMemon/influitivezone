#!/bin/bash

# Test script to verify frontend-backend connection
echo "🧪 Testing Influitive Zone Frontend-Backend Connection"
echo "=================================================="

# Test backend health endpoint
echo "1. Testing backend health endpoint..."
BACKEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health)
if [ "$BACKEND_RESPONSE" = "200" ]; then
    echo "✅ Backend health check: PASSED (HTTP $BACKEND_RESPONSE)"
else
    echo "❌ Backend health check: FAILED (HTTP $BACKEND_RESPONSE)"
fi

# Test frontend API proxy
echo "2. Testing frontend API proxy..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/health)
if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "✅ Frontend API proxy: PASSED (HTTP $FRONTEND_RESPONSE)"
else
    echo "❌ Frontend API proxy: FAILED (HTTP $FRONTEND_RESPONSE)"
fi

# Test chatbot endpoint
echo "3. Testing chatbot endpoint..."
CHAT_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"message":"hello","sessionId":"test123"}' \
    -o /dev/null -w "%{http_code}" \
    http://localhost:8080/api/chat)
if [ "$CHAT_RESPONSE" = "200" ]; then
    echo "✅ Chatbot endpoint: PASSED (HTTP $CHAT_RESPONSE)"
else
    echo "❌ Chatbot endpoint: FAILED (HTTP $CHAT_RESPONSE)"
fi

# Test production domain (if accessible)
echo "4. Testing production domain..."
PROD_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://influitivezone.com/api/health)
if [ "$PROD_RESPONSE" = "200" ]; then
    echo "✅ Production domain: PASSED (HTTP $PROD_RESPONSE)"
else
    echo "⚠️  Production domain: Not accessible or not configured (HTTP $PROD_RESPONSE)"
fi

echo ""
echo "📋 Summary:"
echo "- Backend running on port 3001: $([ "$BACKEND_RESPONSE" = "200" ] && echo "✅" || echo "❌")"
echo "- Frontend running on port 8080: $([ "$FRONTEND_RESPONSE" = "200" ] && echo "✅" || echo "❌")"
echo "- Chatbot API working: $([ "$CHAT_RESPONSE" = "200" ] && echo "✅" || echo "❌")"
echo "- Production domain accessible: $([ "$PROD_RESPONSE" = "200" ] && echo "✅" || echo "⚠️")"

echo ""
echo "🔧 Next steps if tests fail:"
echo "1. Check if PM2 processes are running: pm2 status"
echo "2. Check backend logs: pm2 logs backend"
echo "3. Check frontend logs: pm2 logs frontend"
echo "4. Verify Nginx configuration and reload: sudo nginx -s reload"
echo "5. Check firewall settings for ports 3001 and 8080"
