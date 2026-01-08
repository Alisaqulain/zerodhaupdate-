const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"], default: "COMPLETED" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = OrdersSchema; 
