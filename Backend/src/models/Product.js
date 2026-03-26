let mongoose = require("mongoose");
let productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);