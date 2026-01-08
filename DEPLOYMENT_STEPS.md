# 🚀 Quick Deployment Steps - Vercel

## Prerequisites

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

---

## Step-by-Step Deployment

### 1️⃣ Deploy Backend First

```bash
cd backend
vercel
```

**Follow prompts:**
- Set up and deploy? → **Yes**
- Link to existing project? → **No**
- Project name → **zerodha-backend**
- Directory → **./** (press Enter)

**After deployment:**
1. Copy the backend URL (e.g., `https://zerodha-backend.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add:
   - `MONGO_URL` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
4. Redeploy:
   ```bash
   vercel --prod
   ```

---

### 2️⃣ Deploy Frontend

```bash
cd ../frontend
vercel
```

**Follow prompts:**
- Project name → **zerodha-frontend**
- Directory → **./**

**After deployment:**
1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Add:
   - `REACT_APP_API_URL` = `https://zerodha-backend.vercel.app` (your backend URL)
3. Redeploy:
   ```bash
   vercel --prod
   ```

---

### 3️⃣ Deploy Dashboard

```bash
cd ../dashboard
vercel
```

**Follow prompts:**
- Project name → **zerodha-dashboard**
- Directory → **./**

**After deployment:**
1. Go to Vercel Dashboard → Dashboard Project → Settings → Environment Variables
2. Add:
   - `REACT_APP_API_URL` = `https://zerodha-backend.vercel.app` (your backend URL)
3. Redeploy:
   ```bash
   vercel --prod
   ```

---

## ✅ Verification

### Test Backend
```bash
curl https://your-backend.vercel.app/stocks/search?query=RELIANCE
```

### Test Frontend
- Visit your frontend URL
- Try signup/login

### Test Dashboard
- Visit your dashboard URL
- Login and test features

---

## 🔧 Using Deployment Scripts

### Windows (PowerShell)
```powershell
.\deploy-vercel.ps1
```

### Linux/Mac
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

---

## 📝 Environment Variables Summary

### Backend
```
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
```

### Frontend & Dashboard
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

---

## 🎯 Your Final URLs

After deployment, you'll have:
- **Backend:** `https://zerodha-backend.vercel.app`
- **Frontend:** `https://zerodha-frontend.vercel.app`
- **Dashboard:** `https://zerodha-dashboard.vercel.app`

---

## 🐛 Common Issues

**Backend 404:** Check `vercel.json` routes
**Frontend can't connect:** Verify `REACT_APP_API_URL`
**Build fails:** Check build logs in Vercel dashboard

---

**That's it! Your 3 apps are now deployed separately on Vercel! 🎉**

