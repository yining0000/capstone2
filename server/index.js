const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { NlpManager } = require("node-nlp");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"  
}));

// NLP Manager for handling chatbot logic
const manager = new NlpManager({ languages: ['en'] });
(async () => {
    manager.addDocument('en', 'hello', 'greetings.hello');
    manager.addDocument('en', 'goodbye', 'greetings.bye');
    manager.addDocument('en', 'what products do you have', 'products.list');

    manager.addAnswer('en', 'greetings.hello', 'Hello! How can I help you today?');
    manager.addAnswer('en', 'greetings.bye', 'Goodbye, have a great day!');
    manager.addAnswer('en', 'products.list', 'We offer a variety of products, please visit our products page for more information.');

    await manager.train();
    manager.save();
})();

// Chatbot endpoint
app.post("/chatbot", async (req, res) => {
    const { text } = req.body;
    const response = await manager.process('en', text);
    return res.json({ response: response.answer });
});

// ✅ Default Route
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
