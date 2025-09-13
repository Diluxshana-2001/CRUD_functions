const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Books');
    console.log('MongoDB connected...');
  };

module.exports = connectDB;
