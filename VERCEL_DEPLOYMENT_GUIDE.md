# Vercel Deployment Guide - 3 Separate Apps

## Overview

You have 3 separate applications:
1. **Backend** (Node.js/Express API)
2. **Frontend** (React Landing Page)
3. **Dashboard** (React Trading Dashboard)

## Deployment Strategy

You have **2 options**:

### Option 1: Separate Vercel Projects (Recommended)
Deploy each app as a separate Vercel project with different URLs.

### Option 2: Monorepo with Vercel
Use Vercel's monorepo support to deploy all 3 from one repository.

---

## 🚀 Option 1: Separate Projects (Easiest)

### Step 1: Deploy Backend

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to backend:**
   ```bash
   cd backend
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Set up and deploy? **Yes**
     - Which scope? **Your account**
     - Link to existing project? **No**
     - Project name: **zerodha-backend** (or your choice)
     - Directory: **./** (current directory)
     - Override settings? **No**

5. **Set Environment Variables:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your backend project
   - Go to **Settings** → **Environment Variables**
   - Add:
     ```
     MONGO_URL = your_mongodb_connection_string
     JWT_SECRET = your_jwt_secret_key
     ```
   - **Important:** Select "Production", "Preview", and "Development"

6. **Redeploy:**
   ```bash
   vercel --prod
   ```

7. **Copy Backend URL:**
   - Example: `https://zerodha-backend.vercel.app`
   - Save this URL!

---

### Step 2: Deploy Frontend

1. **Navigate to frontend:**
   ```bash
   cd ../frontend
   ```

2. **Create/Update `.env` file:**
   ```env
   REACT_APP_API_URL=https://zerodha-backend.vercel.app
   ```
   (Use your actual backend URL from Step 1)

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Project name: **zerodha-frontend**
     - Directory: **./**
     - Override settings? **No**

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to frontend project settings
   - Add:
     ```
     REACT_APP_API_URL = https://zerodha-backend.vercel.app
     ```
   - Select all environments

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

6. **Copy Frontend URL:**
   - Example: `https://zerodha-frontend.vercel.app`

---

### Step 3: Deploy Dashboard

1. **Navigate to dashboard:**
   ```bash
   cd ../dashboard
   ```

2. **Create/Update `.env` file:**
   ```env
   REACT_APP_API_URL=https://zerodha-backend.vercel.app
   ```
   (Use your actual backend URL)

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Project name: **zerodha-dashboard**
     - Directory: **./**
     - Override settings? **No**

4. **Set Environment Variables in Vercel Dashboard:**
   - Add:
     ```
     REACT_APP_API_URL = https://zerodha-backend.vercel.app
     ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

6. **Copy Dashboard URL:**
   - Example: `https://zerodha-dashboard.vercel.app`

---

## 🔧 Option 2: Monorepo Deployment

If you want all 3 apps in one Vercel project:

### Create Root `vercel.json`

Create `vercel.json` in the **root directory**:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "dashboard/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/index.js"
    },
    {
      "src": "/dashboard/(.*)",
      "dest": "/dashboard/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/backend/index.js"
    },
    {
      "source": "/dashboard/:path*",
      "destination": "/dashboard/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/frontend/:path*"
    }
  ]
}
```

**However, this approach is complex. Option 1 is recommended.**

---

## 📝 Updated Configuration Files

### Backend `vercel.json` (Already exists, but verify)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ],
  "env": {
    "MONGO_URL": "@mongo_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### Frontend `vercel.json` (Already exists)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*\\.(js|css|ico|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Dashboard `vercel.json` (Already exists)

Same as frontend.

---

## 🔐 Environment Variables Setup

### Backend Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `MONGO_URL` | `mongodb+srv://...` | All |
| `JWT_SECRET` | `your_secret_key` | All |

### Frontend Environment Variables

| Variable | Value | Environments |
|----------|-------|--------------|
| `REACT_APP_API_URL` | `https://zerodha-backend.vercel.app` | All |

### Dashboard Environment Variables

| Variable | Value | Environments |
|----------|-------|--------------|
| `REACT_APP_API_URL` | `https://zerodha-backend.vercel.app` | All |

---

## 🚨 Important: Update API URLs

After deploying backend, you **MUST** update:

1. **Frontend `.env`** and **Vercel Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Dashboard `.env`** and **Vercel Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

3. **Redeploy frontend and dashboard** after updating URLs

---

## 📋 Deployment Checklist

### Backend
- [ ] Deploy backend to Vercel
- [ ] Set `MONGO_URL` environment variable
- [ ] Set `JWT_SECRET` environment variable
- [ ] Test backend URL: `https://your-backend.vercel.app/orders`
- [ ] Copy backend URL

### Frontend
- [ ] Update `.env` with backend URL
- [ ] Deploy frontend to Vercel
- [ ] Set `REACT_APP_API_URL` in Vercel dashboard
- [ ] Test frontend URL
- [ ] Verify API calls work

### Dashboard
- [ ] Update `.env` with backend URL
- [ ] Deploy dashboard to Vercel
- [ ] Set `REACT_APP_API_URL` in Vercel dashboard
- [ ] Test dashboard URL
- [ ] Verify API calls work

---

## 🧪 Testing After Deployment

### Test Backend
```bash
curl https://your-backend.vercel.app/stocks/search?query=RELIANCE
```

### Test Frontend
- Visit frontend URL
- Try signup/login
- Check browser console for API errors

### Test Dashboard
- Visit dashboard URL
- Login
- Check if API calls work
- Test all features

---

## 🔄 Update Build Commands (if needed)

### Frontend `package.json`
Make sure build script exists:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

### Dashboard `package.json`
Same as frontend.

### Backend
No build needed, but ensure:
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Backend returns 404
**Solution:** Check `vercel.json` routes configuration

### Issue: Frontend can't connect to backend
**Solution:** 
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS in backend
- Verify backend URL is accessible

### Issue: Environment variables not working
**Solution:**
- Redeploy after setting variables
- Check variable names (case-sensitive)
- Ensure variables are set for correct environment

### Issue: Build fails
**Solution:**
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Check Node.js version (Vercel uses 18.x by default)

---

## 📱 Custom Domains

After deployment, you can add custom domains:

1. Go to project settings
2. Navigate to "Domains"
3. Add your domain
4. Follow DNS configuration instructions

---

## 🎯 Quick Deploy Script

Create a `deploy.sh` script:

```bash
#!/bin/bash

echo "🚀 Deploying Zerodha Clone..."

echo "1. Deploying Backend..."
cd backend
vercel --prod
BACKEND_URL=$(vercel ls | grep zerodha-backend | awk '{print $2}')
echo "Backend URL: $BACKEND_URL"

echo "2. Deploying Frontend..."
cd ../frontend
echo "REACT_APP_API_URL=$BACKEND_URL" > .env.production
vercel --prod

echo "3. Deploying Dashboard..."
cd ../dashboard
echo "REACT_APP_API_URL=$BACKEND_URL" > .env.production
vercel --prod

echo "✅ Deployment complete!"
```

---

## 📚 Summary

**Recommended Approach:**
1. Deploy backend first → Get URL
2. Deploy frontend with backend URL
3. Deploy dashboard with backend URL
4. Test all connections
5. Update environment variables in Vercel dashboard
6. Redeploy if needed

**Your 3 URLs will be:**
- Backend: `https://zerodha-backend.vercel.app`
- Frontend: `https://zerodha-frontend.vercel.app`
- Dashboard: `https://zerodha-dashboard.vercel.app`

---

**Need help? Check Vercel docs: https://vercel.com/docs**

