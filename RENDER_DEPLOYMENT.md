# Render Deployment Configuration

## Backend Deployment on Render

Your backend is deployed on Render. To fix the deployment issue:

### Option 1: Update Render Service Settings (Recommended)

1. Go to your Render Dashboard
2. Select your backend service
3. Go to **Settings**
4. Update these settings:

**Root Directory:** `backend`

**Build Command:** 
```bash
npm install
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- `MONGO_URL` = your MongoDB connection string
- `JWT_SECRET` = your JWT secret key
- `NODE_ENV` = `production`

### Option 2: Use render.yaml (Alternative)

If you want to use the `render.yaml` file I created:

1. Make sure `render.yaml` is in the root of your repository
2. In Render Dashboard, you can import this configuration

### Current Issue

Render is looking for `index.js` in the root, but it's in the `backend/` folder.

**Solution:** Set **Root Directory** to `backend` in Render settings.

---

## Frontend & Dashboard on Vercel

Since backend is on Render, deploy frontend and dashboard to Vercel:

### Frontend Deployment

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Environment Variable:**
     - `REACT_APP_API_URL` = `https://zerodha-backend-ektm.onrender.com`

### Dashboard Deployment

1. Create another Vercel project
2. Set:
   - **Root Directory:** `dashboard`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Environment Variable:**
     - `REACT_APP_API_URL` = `https://zerodha-backend-ektm.onrender.com`

---

## Quick Fix for Render

**In Render Dashboard:**

1. Settings → Root Directory → Set to: `backend`
2. Save
3. Manual Deploy → Deploy latest commit

This should fix the deployment error!

