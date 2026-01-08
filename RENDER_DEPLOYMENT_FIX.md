# Render Deployment Fix

## Problem
Render is looking for `index.js` in the wrong location because your backend is in a subdirectory.

## Solution

### Option 1: Set Root Directory in Render Dashboard (Easiest)

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Settings**
4. Find **Root Directory** setting
5. Set it to: `backend`
6. Save and redeploy

### Option 2: Update Render Configuration

If you're using `render.yaml`, make sure it's configured correctly. I've created `backend/render.yaml` for you.

### Option 3: Update package.json Start Script

The start script should work, but make sure Render knows the root directory is `backend`.

## Quick Fix Steps

1. **In Render Dashboard:**
   - Go to your service → Settings
   - Set **Root Directory** to: `backend`
   - Save

2. **Redeploy:**
   - Click "Manual Deploy" → "Deploy latest commit"

3. **Verify:**
   - Check build logs
   - Should see: "Running 'npm start'" from backend directory
   - Should connect to MongoDB successfully

## Environment Variables

Make sure these are set in Render:
- `MONGO_URL` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key

## After Fix

Your backend should be accessible at:
`https://zerodha-backend-ektm.onrender.com`

Test it:
```bash
curl https://zerodha-backend-ektm.onrender.com/stocks/search?query=RELIANCE
```

