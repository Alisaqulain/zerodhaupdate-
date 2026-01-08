require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const OrdersModel = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");
const WatchlistModel = require("./model/WatchlistModel");
const PriceAlertModel = require("./model/PriceAlertModel");
const TransactionModel = require("./model/TransactionModel");

const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new UserModel({ name, email, password: hashedPassword });

    await user.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
});


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});


app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});




app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order saved!");
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ==================== NEW FEATURES ====================

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

// ========== PORTFOLIO ANALYTICS ==========
app.get("/portfolio/analytics", verifyToken, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    const positions = await PositionsModel.find({});
    
    // Calculate holdings metrics
    let totalInvestment = 0;
    let currentValue = 0;
    let totalProfitLoss = 0;
    
    holdings.forEach(holding => {
      const investment = holding.avg * holding.qty;
      const value = holding.price * holding.qty;
      totalInvestment += investment;
      currentValue += value;
      totalProfitLoss += (value - investment);
    });
    
    // Calculate positions metrics
    let positionsInvestment = 0;
    let positionsValue = 0;
    let positionsProfitLoss = 0;
    
    positions.forEach(position => {
      const investment = position.avg * position.qty;
      const value = position.price * position.qty;
      positionsInvestment += investment;
      positionsValue += value;
      positionsProfitLoss += (value - investment);
    });
    
    const totalReturn = totalInvestment > 0 ? ((totalProfitLoss / totalInvestment) * 100).toFixed(2) : 0;
    const positionsReturn = positionsInvestment > 0 ? ((positionsProfitLoss / positionsInvestment) * 100).toFixed(2) : 0;
    
    // Top performers
    const topPerformers = holdings
      .map(h => ({
        symbol: h.name,
        return: ((h.price - h.avg) / h.avg * 100).toFixed(2),
        profit: (h.price - h.avg) * h.qty
      }))
      .sort((a, b) => parseFloat(b.return) - parseFloat(a.return))
      .slice(0, 5);
    
    // Worst performers
    const worstPerformers = holdings
      .map(h => ({
        symbol: h.name,
        return: ((h.price - h.avg) / h.avg * 100).toFixed(2),
        loss: (h.price - h.avg) * h.qty
      }))
      .sort((a, b) => parseFloat(a.return) - parseFloat(b.return))
      .slice(0, 5);
    
    res.json({
      holdings: {
        totalInvestment: totalInvestment.toFixed(2),
        currentValue: currentValue.toFixed(2),
        profitLoss: totalProfitLoss.toFixed(2),
        returnPercent: totalReturn,
        count: holdings.length
      },
      positions: {
        totalInvestment: positionsInvestment.toFixed(2),
        currentValue: positionsValue.toFixed(2),
        profitLoss: positionsProfitLoss.toFixed(2),
        returnPercent: positionsReturn,
        count: positions.length
      },
      overall: {
        totalInvestment: (totalInvestment + positionsInvestment).toFixed(2),
        totalValue: (currentValue + positionsValue).toFixed(2),
        totalProfitLoss: (totalProfitLoss + positionsProfitLoss).toFixed(2),
        totalReturn: totalInvestment + positionsInvestment > 0 
          ? (((totalProfitLoss + positionsProfitLoss) / (totalInvestment + positionsInvestment)) * 100).toFixed(2)
          : 0
      },
      topPerformers,
      worstPerformers
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate analytics", msg: err.message });
  }
});

// ========== WATCHLIST MANAGEMENT ==========
app.get("/watchlist", verifyToken, async (req, res) => {
  try {
    const watchlist = await WatchlistModel.find({ userId: req.userId }).sort({ addedAt: -1 });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist", msg: err.message });
  }
});

app.post("/watchlist/add", verifyToken, async (req, res) => {
  try {
    const { symbol, name, price } = req.body;
    
    if (!symbol || !name) {
      return res.status(400).json({ msg: "Symbol and name are required" });
    }
    
    // Check if already in watchlist
    const existing = await WatchlistModel.findOne({ userId: req.userId, symbol });
    if (existing) {
      return res.status(400).json({ msg: "Stock already in watchlist" });
    }
    
    const watchlistItem = new WatchlistModel({
      userId: req.userId,
      symbol,
      name,
      price: price || 0,
      change: 0,
      changePercent: 0
    });
    
    await watchlistItem.save();
    res.json({ msg: "Stock added to watchlist", item: watchlistItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to watchlist", msg: err.message });
  }
});

app.delete("/watchlist/remove/:symbol", verifyToken, async (req, res) => {
  try {
    const { symbol } = req.params;
    const result = await WatchlistModel.findOneAndDelete({ userId: req.userId, symbol });
    
    if (!result) {
      return res.status(404).json({ msg: "Stock not found in watchlist" });
    }
    
    res.json({ msg: "Stock removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from watchlist", msg: err.message });
  }
});

app.put("/watchlist/update/:symbol", verifyToken, async (req, res) => {
  try {
    const { symbol } = req.params;
    const { price, change, changePercent } = req.body;
    
    const updated = await WatchlistModel.findOneAndUpdate(
      { userId: req.userId, symbol },
      { price, change, changePercent, updatedAt: new Date() },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ msg: "Stock not found in watchlist" });
    }
    
    res.json({ msg: "Watchlist updated", item: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update watchlist", msg: err.message });
  }
});

// ========== STOCK SEARCH ==========
app.get("/stocks/search", async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 1) {
      return res.json([]);
    }
    
    // Simulated stock database (in production, use a real stock API)
    const stockDatabase = [
      { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2112.4, exchange: "NSE" },
      { symbol: "TCS", name: "Tata Consultancy Services", price: 3194.8, exchange: "NSE" },
      { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1522.35, exchange: "NSE" },
      { symbol: "INFY", name: "Infosys Ltd", price: 1555.45, exchange: "NSE" },
      { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 980.5, exchange: "NSE" },
      { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 541.15, exchange: "NSE" },
      { symbol: "SBIN", name: "State Bank of India", price: 430.2, exchange: "NSE" },
      { symbol: "ITC", name: "ITC Ltd", price: 207.9, exchange: "NSE" },
      { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", price: 2417.4, exchange: "NSE" },
      { symbol: "WIPRO", name: "Wipro Ltd", price: 577.75, exchange: "NSE" },
      { symbol: "ONGC", name: "Oil and Natural Gas Corp", price: 116.8, exchange: "NSE" },
      { symbol: "KPITTECH", name: "KPIT Technologies Ltd", price: 266.45, exchange: "NSE" },
      { symbol: "M&M", name: "Mahindra & Mahindra Ltd", price: 779.8, exchange: "NSE" },
      { symbol: "TATAPOWER", name: "Tata Power Company Ltd", price: 124.15, exchange: "NSE" },
      { symbol: "QUICKHEAL", name: "Quick Heal Technologies", price: 308.55, exchange: "NSE" }
    ];
    
    const searchTerm = query.toUpperCase();
    const results = stockDatabase.filter(stock => 
      stock.symbol.includes(searchTerm) || 
      stock.name.toUpperCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed", msg: err.message });
  }
});

// ========== PRICE ALERTS ==========
app.get("/alerts", verifyToken, async (req, res) => {
  try {
    const alerts = await PriceAlertModel.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts", msg: err.message });
  }
});

app.post("/alerts/create", verifyToken, async (req, res) => {
  try {
    const { symbol, name, targetPrice, condition, currentPrice } = req.body;
    
    if (!symbol || !targetPrice || !condition) {
      return res.status(400).json({ msg: "Symbol, targetPrice, and condition are required" });
    }
    
    if (!["above", "below"].includes(condition)) {
      return res.status(400).json({ msg: "Condition must be 'above' or 'below'" });
    }
    
    const alert = new PriceAlertModel({
      userId: req.userId,
      symbol,
      name: name || symbol,
      targetPrice,
      condition,
      currentPrice: currentPrice || 0
    });
    
    await alert.save();
    res.json({ msg: "Price alert created", alert });
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert", msg: err.message });
  }
});

app.delete("/alerts/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PriceAlertModel.findOneAndDelete({ 
      _id: id, 
      userId: req.userId 
    });
    
    if (!result) {
      return res.status(404).json({ msg: "Alert not found" });
    }
    
    res.json({ msg: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete alert", msg: err.message });
  }
});

app.put("/alerts/check", verifyToken, async (req, res) => {
  try {
    const { symbol, currentPrice } = req.body;
    
    if (!symbol || currentPrice === undefined) {
      return res.status(400).json({ msg: "Symbol and currentPrice are required" });
    }
    
    const alerts = await PriceAlertModel.find({
      userId: req.userId,
      symbol,
      isTriggered: false
    });
    
    const triggeredAlerts = [];
    
    for (const alert of alerts) {
      let shouldTrigger = false;
      
      if (alert.condition === "above" && currentPrice >= alert.targetPrice) {
        shouldTrigger = true;
      } else if (alert.condition === "below" && currentPrice <= alert.targetPrice) {
        shouldTrigger = true;
      }
      
      if (shouldTrigger) {
        alert.isTriggered = true;
        alert.triggeredAt = new Date();
        await alert.save();
        triggeredAlerts.push(alert);
      }
    }
    
    res.json({ 
      triggered: triggeredAlerts.length > 0,
      alerts: triggeredAlerts 
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to check alerts", msg: err.message });
  }
});

// ========== TRANSACTION HISTORY ==========
app.get("/transactions", verifyToken, async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const transactions = await TransactionModel.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
    
    const total = await TransactionModel.countDocuments({ userId: req.userId });
    
    res.json({
      transactions,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions", msg: err.message });
  }
});

app.post("/transactions/create", verifyToken, async (req, res) => {
  try {
    const { symbol, name, type, quantity, price, orderId } = req.body;
    
    if (!symbol || !type || !quantity || !price) {
      return res.status(400).json({ msg: "Symbol, type, quantity, and price are required" });
    }
    
    if (!["BUY", "SELL"].includes(type)) {
      return res.status(400).json({ msg: "Type must be 'BUY' or 'SELL'" });
    }
    
    const totalAmount = quantity * price;
    
    const transaction = new TransactionModel({
      userId: req.userId,
      symbol,
      name: name || symbol,
      type,
      quantity,
      price,
      totalAmount,
      orderId
    });
    
    await transaction.save();
    res.json({ msg: "Transaction recorded", transaction });
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction", msg: err.message });
  }
});

// ========== ENHANCED ORDER CREATION (with transaction) ==========
app.post("/newOrder", verifyToken, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
      userId: req.userId,
      createdAt: new Date()
    });
    
    await newOrder.save();
    
    // Create transaction record
    const transaction = new TransactionModel({
      userId: req.userId,
      symbol: name,
      name,
      type: mode,
      quantity: qty,
      price,
      totalAmount: qty * price,
      orderId: newOrder._id
    });
    
    await transaction.save();
    
    res.json({ 
      msg: "Order saved and transaction recorded!", 
      order: newOrder,
      transaction 
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", msg: err.message });
  }
});

// ========== USER-SPECIFIC DATA ==========
app.get("/my-holdings", verifyToken, async (req, res) => {
  try {
    // In a real app, holdings would be linked to userId
    // For now, return all holdings (can be filtered later)
    const holdings = await HoldingsModel.find({});
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings", msg: err.message });
  }
});

app.get("/my-positions", verifyToken, async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions", msg: err.message });
  }
});

app.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders", msg: err.message });
  }
});

// MongoDB Connection with better error handling
if (!url) {
  console.error("❌ MONGO_URL is not set in environment variables!");
  console.log("Please create a .env file in the backend directory with:");
  console.log("MONGO_URL=your_mongodb_connection_string");
  console.log("JWT_SECRET=your_jwt_secret");
} else {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:");
      console.error(err.message);
      
      if (err.message.includes("authentication failed")) {
        console.log("\n🔧 Troubleshooting Steps:");
        console.log("1. Check your MongoDB Atlas username and password");
        console.log("2. URL-encode special characters in your password");
        console.log("3. Verify your IP address is whitelisted in MongoDB Atlas");
        console.log("4. Ensure the database user exists and has proper permissions");
        console.log("\nExample connection string format:");
        console.log("mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority");
      }
    });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
