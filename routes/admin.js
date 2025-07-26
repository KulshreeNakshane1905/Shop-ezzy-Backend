const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const adminAuth = require('../middleware/adminAuth');

// Register a new admin (for initial setup only)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      res.status(400).json({ error: 'Email already exists.' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(admin);
});

// --- ADMIN MANAGEMENT ROUTES (protected) ---

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get all products
router.get('/products', adminAuth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create a product
router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders
router.get('/orders', adminAuth, async (req, res) => {
  const orders = await Order.find().populate('user');
  res.json(orders);
});

module.exports = router; 