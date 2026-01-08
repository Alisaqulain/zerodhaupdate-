# Vercel Deployment Script for Zerodha Clone (PowerShell)
# This script deploys all 3 apps (backend, frontend, dashboard) to Vercel

Write-Host "🚀 Starting Vercel Deployment for Zerodha Clone..." -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Step 1: Deploy Backend
Write-Host "📦 Step 1: Deploying Backend..." -ForegroundColor Cyan
Set-Location backend
Write-Host "   Current directory: $(Get-Location)"
Write-Host "   ⚠️  Make sure MONGO_URL and JWT_SECRET are set in Vercel dashboard after deployment" -ForegroundColor Yellow
vercel --prod
Write-Host "   ✅ Backend deployed!" -ForegroundColor Green
Write-Host "   📝 Note: Copy the backend URL and update frontend/dashboard .env files" -ForegroundColor Yellow
Write-Host ""

# Step 2: Deploy Frontend
Write-Host "📦 Step 2: Deploying Frontend..." -ForegroundColor Cyan
Set-Location ..\frontend
Write-Host "   Current directory: $(Get-Location)"
Write-Host "   ⚠️  Make sure REACT_APP_API_URL is set in Vercel dashboard" -ForegroundColor Yellow
vercel --prod
Write-Host "   ✅ Frontend deployed!" -ForegroundColor Green
Write-Host ""

# Step 3: Deploy Dashboard
Write-Host "📦 Step 3: Deploying Dashboard..." -ForegroundColor Cyan
Set-Location ..\dashboard
Write-Host "   Current directory: $(Get-Location)"
Write-Host "   ⚠️  Make sure REACT_APP_API_URL is set in Vercel dashboard" -ForegroundColor Yellow
vercel --prod
Write-Host "   ✅ Dashboard deployed!" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All deployments complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel Dashboard and set environment variables for each project"
Write-Host "2. Update REACT_APP_API_URL in frontend and dashboard with your backend URL"
Write-Host "3. Redeploy frontend and dashboard after setting environment variables"
Write-Host ""
Write-Host "🔗 Your projects will be available at:" -ForegroundColor Cyan
Write-Host "   - Backend: https://your-backend-project.vercel.app"
Write-Host "   - Frontend: https://your-frontend-project.vercel.app"
Write-Host "   - Dashboard: https://your-dashboard-project.vercel.app"

