const mongoose = require('mongoose');
require('dotenv').config();

// Establish the database connection
mongoose.connect(process.env.DBURL);

// Get the Mongoose connection object
const db = mongoose.connection;

// Listen for connection events
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the Mongoose connection
module.exports = db;
