const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/search", async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return res.status(400).json({ error: "Invalid price range" });
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
