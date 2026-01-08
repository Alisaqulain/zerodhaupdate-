# Testing Guide - Zerodha Clone

## Prerequisites

1. **Backend running** on `http://localhost:8000`
2. **Frontend running** on `http://localhost:3000`
3. **Dashboard running** on `http://localhost:3001`
4. **MongoDB connected** and working

## Step-by-Step Testing

### 1. Test Authentication Flow

#### Frontend Signup/Login
1. Navigate to `http://localhost:3000`
2. Click "Signup" in navbar
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
4. Click "Sign Up"
5. Should redirect to login page
6. Login with the same credentials
7. Should redirect to dashboard

**Expected:** User can signup and login successfully

#### Dashboard Authentication
1. Navigate to `http://localhost:3001`
2. If not logged in, should see login prompt
3. Login using the credentials from frontend
4. Should see dashboard with user name

**Expected:** Authentication works across frontend and dashboard

---

### 2. Test Portfolio Analytics

1. Login to dashboard
2. Navigate to "Analytics" from menu
3. Check if analytics load:
   - Total Portfolio value
   - Holdings metrics
   - Positions metrics
   - Top performers
   - Worst performers

**Expected:** Analytics display correctly with calculated values

**API Test:**
```bash
# Get token first (from login)
curl -X GET http://localhost:8000/portfolio/analytics \
  -H "Authorization: YOUR_TOKEN"
```

---

### 3. Test Stock Search

1. In dashboard, go to "Alerts" or "Watchlist Manager"
2. Use the search box
3. Type "RELIANCE" or "TCS"
4. Should see dropdown with matching stocks
5. Click "Add" to add to watchlist

**Expected:** Search works and shows results

**API Test:**
```bash
curl "http://localhost:8000/stocks/search?query=RELIANCE"
```

---

### 4. Test Watchlist Management

1. Navigate to "Watchlist Manager" (or use search in Alerts)
2. Search for a stock (e.g., "RELIANCE")
3. Click "Add" to add to watchlist
4. Stock should appear in watchlist
5. Click delete button to remove

**Expected:** Can add and remove stocks from watchlist

**API Tests:**
```bash
# Add to watchlist
curl -X POST http://localhost:8000/watchlist/add \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "price": 2112.4
  }'

# Get watchlist
curl -X GET http://localhost:8000/watchlist \
  -H "Authorization: YOUR_TOKEN"

# Remove from watchlist
curl -X DELETE http://localhost:8000/watchlist/remove/RELIANCE \
  -H "Authorization: YOUR_TOKEN"
```

---

### 5. Test Price Alerts

1. Navigate to "Alerts" in dashboard
2. Click "New Alert"
3. Search for a stock (e.g., "TCS")
4. Set target price (e.g., 3500)
5. Choose condition (Above/Below)
6. Click "Create Alert"
7. Alert should appear in list
8. Test delete functionality

**Expected:** Can create and manage price alerts

**API Tests:**
```bash
# Create alert
curl -X POST http://localhost:8000/alerts/create \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "TCS",
    "name": "Tata Consultancy Services",
    "targetPrice": 3500,
    "condition": "above",
    "currentPrice": 3194.8
  }'

# Get alerts
curl -X GET http://localhost:8000/alerts \
  -H "Authorization: YOUR_TOKEN"

# Check alerts (simulate price change)
curl -X PUT http://localhost:8000/alerts/check \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "TCS",
    "currentPrice": 3505
  }'
```

---

### 6. Test Order Placement

1. Navigate to dashboard
2. Go to watchlist sidebar
3. Hover over a stock
4. Click "Buy" button
5. Enter quantity and price
6. Click "Buy" in the order window
7. Go to "Orders" page
8. Verify order appears

**Expected:** Orders are created and displayed

**API Test:**
```bash
curl -X POST http://localhost:8000/newOrder \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "RELIANCE",
    "qty": 10,
    "price": 2100,
    "mode": "BUY"
  }'
```

---

### 7. Test Transaction History

1. Place an order (from step 6)
2. Transaction should be automatically created
3. Check transaction endpoint

**Expected:** Transactions are recorded automatically

**API Test:**
```bash
curl -X GET "http://localhost:8000/transactions?limit=10&offset=0" \
  -H "Authorization: YOUR_TOKEN"
```

---

### 8. Test Dark Mode

1. In dashboard, look for theme toggle button (sun/moon icon)
2. Click to toggle between light and dark mode
3. Check if all components adapt
4. Refresh page - theme should persist

**Expected:** Dark mode works and persists

---

### 9. Test Real-time Updates

1. Navigate to dashboard
2. Check top bar for market indices (NIFTY, SENSEX)
3. Watch for updates (should update every 5 seconds)
4. Check watchlist prices (should update every 3 seconds)

**Expected:** Prices update in real-time

---

### 10. Test Notifications

1. In dashboard, look for notification bell icon
2. Click to open notification center
3. Wait for stock movement notifications (every 30 seconds)
4. Check if notifications appear
5. Test "Clear All" functionality

**Expected:** Notifications work and display correctly

---

### 11. Test Responsive Design

1. Open dashboard in browser
2. Open developer tools (F12)
3. Toggle device toolbar
4. Test on mobile view (375px width)
5. Check:
   - Menu collapses properly
   - Charts resize
   - Forms are usable
   - Buttons are accessible

**Expected:** All features work on mobile

---

### 12. Test API Error Handling

#### Test Invalid Token
```bash
curl -X GET http://localhost:8000/portfolio/analytics \
  -H "Authorization: invalid_token"
```
**Expected:** Returns 401 Unauthorized

#### Test Missing Fields
```bash
curl -X POST http://localhost:8000/watchlist/add \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```
**Expected:** Returns 400 Bad Request with error message

---

## Complete User Flow Test

### Scenario: Complete Trading Flow

1. **Signup/Login**
   - Create account on frontend
   - Login to dashboard

2. **Explore Dashboard**
   - View summary with AI insights
   - Check portfolio analytics
   - View holdings and positions

3. **Search and Add Stocks**
   - Search for "RELIANCE"
   - Add to watchlist
   - Add multiple stocks

4. **Create Price Alerts**
   - Create alert for RELIANCE at 2200 (above)
   - Create alert for TCS at 3000 (below)

5. **Place Orders**
   - Buy 10 shares of RELIANCE at 2100
   - Check orders page
   - Verify transaction created

6. **Monitor Portfolio**
   - Check analytics page
   - View top/worst performers
   - Check real-time updates

7. **Manage Watchlist**
   - Remove stocks from watchlist
   - Add new stocks
   - Update prices

---

## Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution:** 
- Check backend is running on port 8000
- Verify `REACT_APP_API_URL` in `.env` files
- Check CORS settings in backend

### Issue: "Authentication failed"
**Solution:**
- Check JWT token is valid
- Verify token in localStorage
- Re-login if token expired

### Issue: "MongoDB connection error"
**Solution:**
- Check MongoDB connection string
- Verify IP is whitelisted
- Check username/password encoding

### Issue: "No data showing"
**Solution:**
- Check if data exists in database
- Verify API endpoints return data
- Check browser console for errors

---

## Performance Testing

### Test API Response Times
```bash
# Time the API calls
time curl -X GET http://localhost:8000/portfolio/analytics \
  -H "Authorization: YOUR_TOKEN"
```

### Test Frontend Load Times
1. Open browser DevTools → Network tab
2. Reload dashboard
3. Check load times for:
   - Initial page load < 2s
   - API calls < 500ms
   - Chart rendering < 1s

---

## Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## Security Testing

1. **Test JWT Expiration**
   - Login and wait 1 hour
   - Try to access protected endpoint
   - Should require re-login

2. **Test Input Validation**
   - Try SQL injection in search
   - Try XSS in form fields
   - Should be sanitized

3. **Test CORS**
   - Try accessing API from different origin
   - Should be blocked if not whitelisted

---

## Automated Testing (Future)

Consider adding:
- Jest unit tests for components
- React Testing Library for UI tests
- API integration tests
- E2E tests with Cypress

---

## Test Checklist

- [ ] Authentication (signup/login)
- [ ] Portfolio Analytics
- [ ] Stock Search
- [ ] Watchlist Management
- [ ] Price Alerts
- [ ] Order Placement
- [ ] Transaction History
- [ ] Dark Mode
- [ ] Real-time Updates
- [ ] Notifications
- [ ] Responsive Design
- [ ] Error Handling
- [ ] API Security
- [ ] Performance

---

## Reporting Issues

If you find bugs:
1. Note the steps to reproduce
2. Check browser console for errors
3. Check network tab for failed requests
4. Document the expected vs actual behavior

---

**Happy Testing! 🚀**

