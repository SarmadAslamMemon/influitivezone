# PowerShell test script to verify frontend-backend connection
Write-Host "🧪 Testing Influitive Zone Frontend-Backend Connection" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Test backend health endpoint
Write-Host "1. Testing backend health endpoint..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET -UseBasicParsing
    if ($backendResponse.StatusCode -eq 200) {
        Write-Host "✅ Backend health check: PASSED (HTTP $($backendResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend health check: FAILED (HTTP $($backendResponse.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Backend health check: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test frontend API proxy
Write-Host "2. Testing frontend API proxy..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/health" -Method GET -UseBasicParsing
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend API proxy: PASSED (HTTP $($frontendResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend API proxy: FAILED (HTTP $($frontendResponse.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Frontend API proxy: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test chatbot endpoint
Write-Host "3. Testing chatbot endpoint..." -ForegroundColor Yellow
try {
    $chatBody = @{
        message = "hello"
        sessionId = "test123"
    } | ConvertTo-Json
    
    $chatResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/chat" -Method POST -Body $chatBody -ContentType "application/json" -UseBasicParsing
    if ($chatResponse.StatusCode -eq 200) {
        Write-Host "✅ Chatbot endpoint: PASSED (HTTP $($chatResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "❌ Chatbot endpoint: FAILED (HTTP $($chatResponse.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Chatbot endpoint: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test production domain (if accessible)
Write-Host "4. Testing production domain..." -ForegroundColor Yellow
try {
    $prodResponse = Invoke-WebRequest -Uri "https://influitivezone.com/api/health" -Method GET -UseBasicParsing
    if ($prodResponse.StatusCode -eq 200) {
        Write-Host "✅ Production domain: PASSED (HTTP $($prodResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Production domain: Not accessible or not configured (HTTP $($prodResponse.StatusCode))" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Production domain: Not accessible or not configured - $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "- Backend running on port 3001: $(if ($backendResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor White
Write-Host "- Frontend running on port 8080: $(if ($frontendResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor White
Write-Host "- Chatbot API working: $(if ($chatResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor White
Write-Host "- Production domain accessible: $(if ($prodResponse.StatusCode -eq 200) { '✅' } else { '⚠️' })" -ForegroundColor White

Write-Host ""
Write-Host "🔧 Next steps if tests fail:" -ForegroundColor Cyan
Write-Host "1. Check if PM2 processes are running: pm2 status" -ForegroundColor White
Write-Host "2. Check backend logs: pm2 logs backend" -ForegroundColor White
Write-Host "3. Check frontend logs: pm2 logs frontend" -ForegroundColor White
Write-Host "4. Verify Nginx configuration and reload: sudo nginx -s reload" -ForegroundColor White
Write-Host "5. Check firewall settings for ports 3001 and 8080" -ForegroundColor White
