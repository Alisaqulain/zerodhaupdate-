const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number, default: 0 },
  changePercent: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now }
});

const WatchlistModel = mongoose.model("Watchlist", WatchlistSchema);

module.exports = WatchlistModel;

