#!/bin/bash

# Vercel Deployment Script for Zerodha Clone
# This script deploys all 3 apps (backend, frontend, dashboard) to Vercel

echo "🚀 Starting Vercel Deployment for Zerodha Clone..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Step 1: Deploy Backend
echo "📦 Step 1: Deploying Backend..."
cd backend
echo "   Current directory: $(pwd)"
echo "   ⚠️  Make sure MONGO_URL and JWT_SECRET are set in Vercel dashboard after deployment"
vercel --prod
echo "   ✅ Backend deployed!"
echo "   📝 Note: Copy the backend URL and update frontend/dashboard .env files"
echo ""

# Step 2: Deploy Frontend
echo "📦 Step 2: Deploying Frontend..."
cd ../frontend
echo "   Current directory: $(pwd)"
echo "   ⚠️  Make sure REACT_APP_API_URL is set in Vercel dashboard"
vercel --prod
echo "   ✅ Frontend deployed!"
echo ""

# Step 3: Deploy Dashboard
echo "📦 Step 3: Deploying Dashboard..."
cd ../dashboard
echo "   Current directory: $(pwd)"
echo "   ⚠️  Make sure REACT_APP_API_URL is set in Vercel dashboard"
vercel --prod
echo "   ✅ Dashboard deployed!"
echo ""

echo "🎉 All deployments complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Vercel Dashboard and set environment variables for each project"
echo "2. Update REACT_APP_API_URL in frontend and dashboard with your backend URL"
echo "3. Redeploy frontend and dashboard after setting environment variables"
echo ""
echo "🔗 Your projects will be available at:"
echo "   - Backend: https://your-backend-project.vercel.app"
echo "   - Frontend: https://your-frontend-project.vercel.app"
echo "   - Dashboard: https://your-dashboard-project.vercel.app"

