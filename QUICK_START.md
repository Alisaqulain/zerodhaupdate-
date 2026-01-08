# Quick Start Guide - Zerodha Clone

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

Start backend:
```bash
npm start
# or for development
npm run dev
```

✅ Backend should be running on `http://localhost:8000`

---

### Step 2: Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8000
```

Start frontend:
```bash
npm start
```

✅ Frontend should be running on `http://localhost:3000`

---

### Step 3: Setup Dashboard

```bash
cd dashboard
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8000
```

Start dashboard:
```bash
npm start
```

✅ Dashboard should be running on `http://localhost:3001`

---

## 🧪 Quick Test

### Test Backend API

```bash
cd backend
node test-api.js
```

This will test:
- ✅ Stock search
- ✅ User signup/login
- ✅ Portfolio analytics
- ✅ Watchlist
- ✅ Alerts
- ✅ Holdings/Orders

---

## 📱 First Steps After Setup

1. **Create Account**
   - Go to `http://localhost:3000`
   - Click "Signup"
   - Create your account

2. **Login to Dashboard**
   - Go to `http://localhost:3001`
   - Login with your credentials

3. **Explore Features**
   - View Portfolio Analytics
   - Search and add stocks to watchlist
   - Create price alerts
   - Place orders

---

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify `.env` file exists
- Check if port 8000 is available

### Frontend/Dashboard won't start
- Check if port 3000/3001 is available
- Verify `.env` file has `REACT_APP_API_URL`
- Try `npm install` again

### API calls failing
- Verify backend is running
- Check `REACT_APP_API_URL` in frontend/dashboard `.env`
- Check browser console for CORS errors

---

## 📚 Next Steps

- Read `TESTING_GUIDE.md` for comprehensive testing
- Read `API_DOCUMENTATION.md` for API details
- Read `DEPLOYMENT.md` for Vercel deployment

---

**Happy Coding! 🎉**

