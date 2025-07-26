const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for reset');
    
    try {
      const db = mongoose.connection.db;
      
      // Drop all collections
      const collections = await db.listCollections().toArray();
      
      for (let collection of collections) {
        await db.dropCollection(collection.name);
        console.log(`Dropped collection: ${collection.name}`);
      }
      
      console.log('Database reset completed!');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error resetting database:', error);
      mongoose.connection.close();
    }
  })
  .catch(err => console.log(err)); 