const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, total, shippingAddress, paymentMethod } = req.body;
    
    // Generate order number
    const orderNumber = `SE${Date.now().toString().slice(-6)}`;
    
    const order = new Order({
      user: userId,
      orderNumber,
      items,
      total,
      shippingAddress,
      paymentMethod
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 