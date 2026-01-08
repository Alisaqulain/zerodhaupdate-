# Deployment Guide - Vercel

This guide will help you deploy the Zerodha Clone project on Vercel.

## Prerequisites

1. Vercel account (sign up at [vercel.com](https://vercel.com))
2. MongoDB database (MongoDB Atlas recommended)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Backend Deployment

#### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```
   - Follow prompts (use defaults)
   - When asked for environment variables, skip for now

5. Set Environment Variables in Vercel Dashboard:
   - Go to your project on Vercel
   - Navigate to Settings → Environment Variables
   - Add:
     - `MONGO_URL`: Your MongoDB connection string
     - `JWT_SECRET`: A random secret string (e.g., use `openssl rand -base64 32`)

6. Redeploy:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Set Root Directory to `backend`
5. Framework Preset: "Other"
6. Build Command: Leave empty (or `npm install`)
7. Output Directory: Leave empty
8. Install Command: `npm install`
9. Add Environment Variables:
   - `MONGO_URL`
   - `JWT_SECRET`
10. Deploy

**Note:** Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### 2. Frontend Deployment

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Create/Update `.env` file:
   ```env
   REACT_APP_API_URL=https://your-backend.vercel.app
   ```

3. Deploy using Vercel CLI:
   ```bash
   vercel
   ```

   Or via Dashboard:
   - Root Directory: `frontend`
   - Framework Preset: "Create React App"
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables:
     - `REACT_APP_API_URL`: Your backend Vercel URL

### 3. Dashboard Deployment

1. Navigate to dashboard directory:
   ```bash
   cd dashboard
   ```

2. Create/Update `.env` file:
   ```env
   REACT_APP_API_URL=https://your-backend.vercel.app
   ```

3. Deploy using Vercel CLI:
   ```bash
   vercel
   ```

   Or via Dashboard:
   - Root Directory: `dashboard`
   - Framework Preset: "Create React App"
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables:
     - `REACT_APP_API_URL`: Your backend Vercel URL

## Environment Variables Summary

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-here
PORT=8000 (auto-set by Vercel)
```

### Frontend/Dashboard (.env)
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

## MongoDB Setup (MongoDB Atlas)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Use this as `MONGO_URL`

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Environment variables set correctly
- [ ] MongoDB connection working
- [ ] Frontend can connect to backend
- [ ] Dashboard can connect to backend
- [ ] Authentication working
- [ ] All API endpoints responding

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Verify `MONGO_URL` is correct
- Check MongoDB Atlas IP whitelist
- Verify database user credentials

**Error: JWT verification failed**
- Ensure `JWT_SECRET` matches in all environments
- Check token expiration settings

### Frontend/Dashboard Issues

**Error: Network Error / CORS**
- Verify `REACT_APP_API_URL` is correct
- Check backend CORS configuration
- Ensure backend is deployed and running

**Error: Environment variables not loading**
- Restart Vercel deployment
- Verify variable names start with `REACT_APP_`
- Check Vercel dashboard for correct values

### Build Issues

**Build fails on Vercel**
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18 by default)

## Custom Domain Setup

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

## Monitoring & Analytics

- Use Vercel Analytics (available in dashboard)
- Check function logs for backend errors
- Monitor API response times
- Set up error tracking (optional: Sentry)

## Continuous Deployment

Vercel automatically deploys on:
- Push to main/master branch (production)
- Push to other branches (preview deployments)
- Pull requests (preview deployments)

## Rollback

If deployment fails:
1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find previous successful deployment
4. Click "..." → "Promote to Production"

## Cost Considerations

- Vercel Hobby (Free): Sufficient for small projects
- Backend: Serverless functions (generous free tier)
- MongoDB Atlas: Free tier available (512MB storage)
- Frontend/Dashboard: Static hosting (unlimited on free tier)

## Security Best Practices

1. **Never commit `.env` files** - Use Vercel environment variables
2. **Use strong JWT_SECRET** - Generate with: `openssl rand -base64 32`
3. **MongoDB Security**:
   - Use strong passwords
   - Limit IP whitelist
   - Enable authentication
4. **HTTPS**: Automatically enabled by Vercel
5. **CORS**: Configured in backend for specific origins

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: Available in dashboard
- MongoDB Atlas Docs: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**Note**: After deployment, update any hardcoded URLs in your codebase to use environment variables.


