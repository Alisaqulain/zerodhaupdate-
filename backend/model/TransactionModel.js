const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["BUY", "SELL"], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"], default: "COMPLETED" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  createdAt: { type: Date, default: Date.now }
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;

