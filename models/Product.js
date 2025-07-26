const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema); 