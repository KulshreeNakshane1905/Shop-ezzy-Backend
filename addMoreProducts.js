const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for adding more products'))
  .catch(err => console.log(err));

// Product Model
const Product = require('./models/Product');

const additionalProducts = [
  // Electronics
  {
    title: "Gaming Laptop Pro",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    category: "electronics",
    rating: { rate: 4.7, count: 89 },
    description: "High-performance gaming laptop with RTX graphics and RGB keyboard."
  },
  {
    title: "Wireless Earbuds",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "electronics",
    rating: { rate: 4.5, count: 156 },
    description: "True wireless earbuds with noise cancellation and 24-hour battery life."
  },
  {
    title: "Smart Fitness Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    category: "electronics",
    rating: { rate: 4.6, count: 203 },
    description: "Advanced fitness tracker with heart rate monitoring and GPS."
  },
  {
    title: "4K Smart TV",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "electronics",
    rating: { rate: 4.8, count: 67 },
    description: "55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps."
  },

  // Men's Clothing
  {
    title: "Premium Cotton Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: { rate: 4.4, count: 98 },
    description: "Comfortable cotton hoodie perfect for casual wear and outdoor activities."
  },
  {
    title: "Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: { rate: 4.3, count: 112 },
    description: "Modern slim fit jeans with stretch fabric for maximum comfort."
  },
  {
    title: "Formal Business Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: { rate: 4.5, count: 87 },
    description: "Professional business shirt suitable for office and formal occasions."
  },
  {
    title: "Casual Sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "men's clothing",
    rating: { rate: 4.6, count: 134 },
    description: "Comfortable sneakers perfect for daily wear and light activities."
  },

  // Women's Clothing
  {
    title: "Elegant Evening Dress",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    category: "women's clothing",
    rating: { rate: 4.7, count: 76 },
    description: "Beautiful evening dress perfect for special occasions and parties."
  },
  {
    title: "Casual Summer Blouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4c3fa9ec?w=400&h=400&fit=crop",
    category: "women's clothing",
    rating: { rate: 4.4, count: 92 },
    description: "Light and comfortable blouse perfect for summer days."
  },
  {
    title: "High-Waist Leggings",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506629905608-ee5c5fae51b0?w=400&h=400&fit=crop",
    category: "women's clothing",
    rating: { rate: 4.5, count: 118 },
    description: "Comfortable high-waist leggings for workout and casual wear."
  },
  {
    title: "Fashionable Handbag",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "women's clothing",
    rating: { rate: 4.6, count: 85 },
    description: "Stylish handbag with multiple compartments for everyday use."
  },

  // Jewelry
  {
    title: "Sterling Silver Necklace",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: { rate: 4.8, count: 56 },
    description: "Elegant sterling silver necklace with delicate pendant design."
  },
  {
    title: "Gold-Plated Bracelet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: { rate: 4.4, count: 73 },
    description: "Beautiful gold-plated bracelet perfect for any occasion."
  },
  {
    title: "Pearl Earrings",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: { rate: 4.7, count: 42 },
    description: "Classic pearl earrings for elegant and sophisticated look."
  },
  {
    title: "Crystal Ring Set",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "jewelery",
    rating: { rate: 4.5, count: 38 },
    description: "Beautiful crystal ring set with multiple pieces for different occasions."
  }
];

async function addMoreProducts() {
  try {
    // Add new products
    const insertedProducts = await Product.insertMany(additionalProducts);
    console.log(`Successfully added ${insertedProducts.length} more products`);

    // Display the new products
    console.log('\nAdded products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.title} ($${product.price}) - ${product.category}`);
    });

    // Get total count
    const totalProducts = await Product.countDocuments();
    console.log(`\nTotal products in database: ${totalProducts}`);

    mongoose.connection.close();
    console.log('\nDatabase seeding completed!');
  } catch (error) {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  }
}

addMoreProducts(); 