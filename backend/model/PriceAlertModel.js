const mongoose = require("mongoose");

const PriceAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  condition: { type: String, enum: ["above", "below"], required: true },
  currentPrice: { type: Number, required: true },
  isTriggered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  triggeredAt: { type: Date }
});

const PriceAlertModel = mongoose.model("PriceAlert", PriceAlertSchema);

module.exports = PriceAlertModel;

