# API Documentation - Zerodha Clone

## Base URL
```
http://localhost:8000
```

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: <your_jwt_token>
```

---

## Authentication Endpoints

### POST /signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "msg": "User registered successfully"
}
```

### POST /login
Login and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /profile
Get user profile (requires authentication).

**Headers:**
```
Authorization: <token>
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## Portfolio Analytics

### GET /portfolio/analytics
Get comprehensive portfolio analytics (requires authentication).

**Response:**
```json
{
  "holdings": {
    "totalInvestment": "29875.55",
    "currentValue": "31428.95",
    "profitLoss": "1553.40",
    "returnPercent": "5.20",
    "count": 13
  },
  "positions": {
    "totalInvestment": "5000.00",
    "currentValue": "5200.00",
    "profitLoss": "200.00",
    "returnPercent": "4.00",
    "count": 2
  },
  "overall": {
    "totalInvestment": "34875.55",
    "totalValue": "36628.95",
    "totalProfitLoss": "1753.40",
    "totalReturn": "5.03"
  },
  "topPerformers": [
    {
      "symbol": "INFY",
      "return": "15.18",
      "profit": 204.95
    }
  ],
  "worstPerformers": [
    {
      "symbol": "M&M",
      "return": "-3.72",
      "loss": -60.20
    }
  ]
}
```

---

## Watchlist Management

### GET /watchlist
Get user's watchlist (requires authentication).

**Response:**
```json
[
  {
    "_id": "alert_id",
    "userId": "user_id",
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "price": 2112.4,
    "change": 30.5,
    "changePercent": 1.44,
    "addedAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /watchlist/add
Add stock to watchlist (requires authentication).

**Request Body:**
```json
{
  "symbol": "RELIANCE",
  "name": "Reliance Industries Ltd",
  "price": 2112.4
}
```

**Response:**
```json
{
  "msg": "Stock added to watchlist",
  "item": { ... }
}
```

### DELETE /watchlist/remove/:symbol
Remove stock from watchlist (requires authentication).

**Example:**
```
DELETE /watchlist/remove/RELIANCE
```

### PUT /watchlist/update/:symbol
Update watchlist item price (requires authentication).

**Request Body:**
```json
{
  "price": 2150.0,
  "change": 37.6,
  "changePercent": 1.78
}
```

---

## Stock Search

### GET /stocks/search
Search for stocks (public endpoint, no auth required).

**Query Parameters:**
- `query`: Search term (symbol or name)

**Example:**
```
GET /stocks/search?query=RELIANCE
```

**Response:**
```json
[
  {
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "price": 2112.4,
    "exchange": "NSE"
  }
]
```

---

## Price Alerts

### GET /alerts
Get all price alerts (requires authentication).

**Response:**
```json
[
  {
    "_id": "alert_id",
    "userId": "user_id",
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "targetPrice": 2200,
    "condition": "above",
    "currentPrice": 2112.4,
    "isTriggered": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /alerts/create
Create a price alert (requires authentication).

**Request Body:**
```json
{
  "symbol": "RELIANCE",
  "name": "Reliance Industries Ltd",
  "targetPrice": 2200,
  "condition": "above",
  "currentPrice": 2112.4
}
```

**Note:** `condition` must be either "above" or "below"

### DELETE /alerts/delete/:id
Delete a price alert (requires authentication).

**Example:**
```
DELETE /alerts/delete/alert_id
```

### PUT /alerts/check
Check if any alerts should be triggered (requires authentication).

**Request Body:**
```json
{
  "symbol": "RELIANCE",
  "currentPrice": 2205.0
}
```

**Response:**
```json
{
  "triggered": true,
  "alerts": [
    {
      "_id": "alert_id",
      "symbol": "RELIANCE",
      "targetPrice": 2200,
      "condition": "above",
      "isTriggered": true,
      "triggeredAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

---

## Transaction History

### GET /transactions
Get transaction history (requires authentication).

**Query Parameters:**
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)

**Example:**
```
GET /transactions?limit=20&offset=0
```

**Response:**
```json
{
  "transactions": [
    {
      "_id": "transaction_id",
      "userId": "user_id",
      "symbol": "RELIANCE",
      "name": "Reliance Industries Ltd",
      "type": "BUY",
      "quantity": 10,
      "price": 2100,
      "totalAmount": 21000,
      "status": "COMPLETED",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "limit": 20,
  "offset": 0
}
```

### POST /transactions/create
Create a transaction record (requires authentication).

**Request Body:**
```json
{
  "symbol": "RELIANCE",
  "name": "Reliance Industries Ltd",
  "type": "BUY",
  "quantity": 10,
  "price": 2100,
  "orderId": "order_id"
}
```

---

## Orders

### GET /orders
Get all orders (public endpoint, returns all orders).

### GET /my-orders
Get user's orders (requires authentication).

### POST /newOrder
Create a new order (requires authentication, now creates transaction automatically).

**Request Body:**
```json
{
  "name": "RELIANCE",
  "qty": 10,
  "price": 2100,
  "mode": "BUY"
}
```

**Response:**
```json
{
  "msg": "Order saved and transaction recorded!",
  "order": { ... },
  "transaction": { ... }
}
```

---

## Holdings & Positions

### GET /allHoldings
Get all holdings (public endpoint).

### GET /my-holdings
Get user's holdings (requires authentication).

### GET /allPositions
Get all positions (public endpoint).

### GET /my-positions
Get user's positions (requires authentication).

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "error": "Error description",
  "msg": "Detailed error message"
}
```

**Common Status Codes:**
- `200`: Success
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not Found
- `500`: Internal Server Error

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. Prices are in Indian Rupees (₹)
3. Quantities are whole numbers (shares)
4. JWT tokens expire after 1 hour
5. Most endpoints require authentication except:
   - `/signup`
   - `/login`
   - `/stocks/search`
   - `/allHoldings`
   - `/allPositions`
   - `/orders`

---

## Example Usage

### Complete Flow: Search → Add to Watchlist → Create Alert → Place Order

```javascript
// 1. Login
const loginRes = await fetch('/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'pass123' })
});
const { token } = await loginRes.json();

// 2. Search for stock
const searchRes = await fetch('/stocks/search?query=RELIANCE');
const stocks = await searchRes.json();

// 3. Add to watchlist
await fetch('/watchlist/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify(stocks[0])
});

// 4. Create price alert
await fetch('/alerts/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify({
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    targetPrice: 2200,
    condition: 'above',
    currentPrice: 2112.4
  })
});

// 5. Place order
await fetch('/newOrder', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify({
    name: 'RELIANCE',
    qty: 10,
    price: 2100,
    mode: 'BUY'
  })
});

// 6. Get portfolio analytics
const analyticsRes = await fetch('/portfolio/analytics', {
  headers: { 'Authorization': token }
});
const analytics = await analyticsRes.json();
```

