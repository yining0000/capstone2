const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware to enable CORS (allow requests from React frontend)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost/greatgold', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Product schema and model
const Product = mongoose.model('Product', {
  name: String,
  price: String,
  image: String
});

// API route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products); // Send the products to the frontend
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const port = 5000; // Your backend will run on port 5000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
