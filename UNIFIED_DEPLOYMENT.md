# Unified Frontend Deployment Guide

## ✅ Frontend + Dashboard Merged!

The dashboard has been successfully merged into the frontend. Now you only need to deploy **ONE** React app instead of two!

## 📁 New Structure

```
frontend/
├── src/
│   ├── landing_page/     # Landing pages (Home, About, Pricing, etc.)
│   ├── dashboard/         # Dashboard components (merged from dashboard/)
│   │   ├── components/   # All dashboard components
│   │   ├── context/      # Auth & Theme contexts
│   │   ├── hooks/        # Custom hooks
│   │   ├── data/         # Data files
│   │   └── config/       # API configuration
│   └── index.js          # Main entry with all routes
```

## 🚀 Deployment to Vercel

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Test Locally

```bash
npm start
```

Visit:
- Landing page: `http://localhost:3000/`
- Dashboard: `http://localhost:3000/dashboard`
- Login: `http://localhost:3000/login`

### Step 3: Deploy to Vercel

```bash
vercel
```

**Follow prompts:**
- Set up and deploy? → **Yes**
- Link to existing project? → **No** (or Yes if updating)
- Project name → **zerodha-frontend** (or your choice)
- Directory → **./**
- Override settings? → **No**

### Step 4: Set Environment Variable

In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add:
   ```
   REACT_APP_API_URL = https://zerodha-backend-ektm.onrender.com
   ```
3. Select: Production, Preview, Development

### Step 5: Redeploy

```bash
vercel --prod
```

## 🎯 Your URLs

After deployment:
- **Landing Page:** `https://your-frontend.vercel.app/`
- **Dashboard:** `https://your-frontend.vercel.app/dashboard`
- **Login:** `https://your-frontend.vercel.app/login`
- **Signup:** `https://your-frontend.vercel.app/signup`

## 📋 Routes Available

### Landing Pages
- `/` - Home page
- `/about` - About page
- `/product` - Products page
- `/pricing` - Pricing page
- `/support` - Support page
- `/login` - Login page
- `/signup` - Signup page

### Dashboard (Protected)
- `/dashboard` - Dashboard summary
- `/dashboard/orders` - Orders
- `/dashboard/holdings` - Holdings
- `/dashboard/positions` - Positions
- `/dashboard/funds` - Funds
- `/dashboard/analytics` - Portfolio Analytics
- `/dashboard/alerts` - Price Alerts
- `/dashboard/apps` - Apps

## ✅ Benefits

1. **Single Deployment** - Only one app to deploy and maintain
2. **Shared Code** - Landing page and dashboard share dependencies
3. **Unified Routing** - All routes in one place
4. **Better UX** - Seamless navigation between landing and dashboard
5. **Easier Maintenance** - One codebase, one build process

## 🔧 Build Configuration

The `vercel.json` is already configured correctly:
- Build command: `npm run build`
- Output directory: `build`
- All routes redirect to `index.html` for React Router

## 🐛 Troubleshooting

### Issue: Dashboard routes return 404
**Solution:** Check `vercel.json` - should have rewrite rule for all routes to `index.html`

### Issue: API calls failing
**Solution:** Verify `REACT_APP_API_URL` is set correctly in Vercel

### Issue: Build fails
**Solution:** 
- Check all dependencies are installed
- Verify Node.js version (Vercel uses 18.x)

## 📝 Summary

✅ Dashboard merged into frontend
✅ All routes working
✅ Dependencies installed
✅ Ready for single deployment

**You now only need to deploy the frontend folder to Vercel!**

