const mongoose = require('mongoose');
const sampleData = require('./data'); // Adjust the path as necessary
const ProductSchema = require('../model/ProductSchema');
const OrdersSchema = require('../model/OrdersSchema');
const UserSchema = require('../model/UserSchema');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const insertSampleData = async () => {
    try {
        await ProductSchema.insertMany(sampleData.products);
        await UserSchema.insertMany(sampleData.users);
        await OrdersSchema.insertMany(sampleData.orders);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
};

const run = async () => {
  await connectDB();
  await insertSampleData();
};

run();
