const express = require("express");
const router = express.Router(); // Initialize router
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// CREATE listing
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const listing = new Listing({
      title,
      description,
      price,
      category,
      image,
      userId: req.user,
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE listing
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
