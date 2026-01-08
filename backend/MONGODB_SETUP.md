# MongoDB Setup Guide

## Fixing "bad auth : authentication failed" Error

This error occurs when MongoDB Atlas cannot authenticate your connection. Follow these steps:

### Step 1: Check Your Connection String

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Step 2: URL-Encode Your Password

**IMPORTANT**: If your password contains special characters, you MUST URL-encode them!

Common special characters and their URL-encoded equivalents:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`
- `/` → `%2F`
- ` ` (space) → `%20`

**Example:**
- Password: `MyP@ss#123`
- URL-encoded: `MyP%40ss%23123`
- Connection string: `mongodb+srv://myuser:MyP%40ss%23123@cluster.mongodb.net/dbname`

### Step 3: Verify MongoDB Atlas Settings

1. **Check Database User:**
   - Go to MongoDB Atlas → Database Access
   - Verify your username and password
   - Ensure user has "Read and write to any database" or specific database permissions

2. **Whitelist IP Address:**
   - Go to MongoDB Atlas → Network Access
   - Add your IP address (or `0.0.0.0/0` for all IPs - less secure but works for development)
   - Click "Add IP Address"

3. **Get Connection String:**
   - Go to MongoDB Atlas → Clusters
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your URL-encoded password
   - Replace `<dbname>` with your database name (e.g., `zerodhaclone`)

### Step 4: Create .env File

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb+srv://yourusername:yoururlencodedpassword@cluster.mongodb.net/zerodhaclone?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=8000
```

### Step 5: Test Connection

Restart your backend server:
```bash
cd backend
npm start
```

You should see: `✅ MongoDB Connected Successfully`

## Quick Fix Checklist

- [ ] Password is URL-encoded in connection string
- [ ] Username is correct (case-sensitive)
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] Database user has proper permissions
- [ ] `.env` file exists in `backend/` directory
- [ ] Connection string format is correct
- [ ] No extra spaces or quotes in `.env` file

## Alternative: Use Local MongoDB

If you prefer to use local MongoDB:

1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Update `.env`:
   ```env
   MONGO_URL=mongodb://localhost:27017/zerodhaclone
   ```

## Still Having Issues?

1. **Reset Database User Password:**
   - MongoDB Atlas → Database Access
   - Edit user → Reset password
   - Use a simple password without special characters for testing

2. **Create New Database User:**
   - MongoDB Atlas → Database Access
   - Add New Database User
   - Username: `zerodha_user`
   - Password: `SimplePassword123` (no special chars)
   - Permissions: "Read and write to any database"

3. **Test Connection String:**
   - Use MongoDB Compass to test your connection string
   - If it works in Compass, it should work in your app

## Security Note

For production:
- Use strong passwords
- Whitelist specific IP addresses only
- Use environment variables (never commit `.env` to git)
- Rotate credentials regularly


