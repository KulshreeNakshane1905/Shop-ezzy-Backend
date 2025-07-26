const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

// Product Model
const Product = require('./models/Product');

const sampleProducts = [
  {
    title: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    rating: {
      rate: 4.8,
      count: 124
    },
    description: "High-quality wireless headphones with noise cancellation and premium sound quality."
  },
  {
    title: "Latest Smartphone Pro",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "electronics",
    rating: {
      rate: 4.9,
      count: 89
    },
    description: "The newest smartphone with advanced camera system and powerful processor."
  },
  {
    title: "Luxury Classic Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: {
      rate: 4.7,
      count: 67
    },
    description: "Elegant classic watch with premium materials and precise timekeeping."
  },
  {
    title: "Ultra-Thin Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "electronics",
    rating: {
      rate: 4.6,
      count: 203
    },
    description: "Lightweight and powerful laptop perfect for work and entertainment."
  },
  {
    title: "Comfortable Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: {
      rate: 4.5,
      count: 156
    },
    description: "Soft and comfortable cotton t-shirt available in multiple colors."
  },
  {
    title: "Elegant Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    category: "women's clothing",
    rating: {
      rate: 4.4,
      count: 98
    },
    description: "Beautiful summer dress perfect for any occasion."
  },
  {
    title: "Stylish Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: {
      rate: 4.3,
      count: 112
    },
    description: "Classic denim jacket with modern styling and comfortable fit."
  },
  {
    title: "Diamond Ring",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: {
      rate: 4.9,
      count: 45
    },
    description: "Stunning diamond ring with excellent craftsmanship and quality."
  }
];

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display the products
    console.log('\nInserted products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.title} ($${product.price})`);
    });

    mongoose.connection.close();
    console.log('\nDatabase seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}

seedProducts(); 