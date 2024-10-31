const mongoose = require('mongoose');

// Sample Product Data
const products = [
  {
    _id: new mongoose.Types.ObjectId(),
    category: "Electronics",
    brand: "Brand X",
    name: "Smartphone",
    description: "Latest model smartphone with high-end features.",
    price: 699,
    qtyOnHand: 50,
    imageUrls: [
      { url: "https://example.com/smartphone.jpg", altText: "Smartphone Image" },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: "Electronics",
    brand: "Brand Y",
    name: "Laptop",
    description: "Powerful laptop suitable for gaming and work.",
    price: 999,
    qtyOnHand: 30,
    imageUrls: [
      { url: "https://example.com/laptop.jpg", altText: "Laptop Image" },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: "Home Appliances",
    brand: "Brand Z",
    name: "Microwave Oven",
    description: "Compact microwave oven with multiple settings.",
    price: 199,
    qtyOnHand: 20,
    imageUrls: [
      { url: "https://example.com/microwave.jpg", altText: "Microwave Image" },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: "Books",
    brand: "Brand A",
    name: "JavaScript for Beginners",
    description: "A comprehensive guide to learning JavaScript.",
    price: 29.99,
    qtyOnHand: 100,
    imageUrls: [
      { url: "https://example.com/js-book.jpg", altText: "JavaScript Book" },
    ],
  },
];

// Sample Order Data
const orders = [
  {
    _id: new mongoose.Types.ObjectId(),
    orderID: "ORD001",
    userID: "USER001",
    totalCost: 699,
    products: [products[0]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderID: "ORD002",
    userID: "USER002",
    totalCost: 999,
    products: [products[1]._id, products[2]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderID: "ORD003",
    userID: "USER001",
    totalCost: 29.99,
    products: [products[3]._id],
  },
];

// Sample User Data
const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    fullName: "Alice Smith",
    email: "alice@example.com",
    password: "password123", // Ensure to hash passwords in real applications
    role: "user",
    emailVerified: true,
    address: "123 Main St, Anytown, USA",
    mobileNumber: "123-456-7890",
    gender: "Female",
    imageUrl: "https://example.com/alice.jpg",
    orderHistory: [orders[0]._id, orders[2]._id], // Reference to orders
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fullName: "Bob Johnson",
    email: "bob@example.com",
    password: "password123",
    role: "user",
    emailVerified: true,
    address: "456 Elm St, Anytown, USA",
    mobileNumber: "987-654-3210",
    gender: "Male",
    imageUrl: "https://example.com/bob.jpg",
    orderHistory: [orders[1]._id], // Reference to orders
  },
];

// Export sample data for insertion
const sampleData = {
  users,
  orders,
  products,
};

module.exports = sampleData;
