const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teamIds: { type: [String], default: [] },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
