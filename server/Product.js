const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true }
});

// Create and export the Product model
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
