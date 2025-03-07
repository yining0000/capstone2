const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"  // Ensure this matches your frontend
}));

// ✅ Default Route (Fixes "Cannot GET /" issue)
app.get("/", (req, res) => {
  res.send("GreatGold API is running!");
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Failed:", error));

// ✅ Define Product Schema & Model
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
});
const Product = mongoose.model("Product", ProductSchema);

// ✅ API Route to Get All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
