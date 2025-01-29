const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true }, // Or use a reference to a User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Listing", listingSchema);
