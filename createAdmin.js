const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for admin creation'))
  .catch(err => console.log(err));

// Admin Model
const Admin = require('./models/Admin');

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists with email: admin@example.com');
      mongoose.connection.close();
      return;
    }

    // Create new admin
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nYou can now login at /admin/login with these credentials.');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin:', error);
    mongoose.connection.close();
  }
}

createAdmin(); 