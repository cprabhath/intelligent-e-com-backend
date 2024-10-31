const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId, // Specify that this is an array of ObjectId
    ref: 'Product', // Reference the Product model
    required: true,
  }],
  status: {
    type: String,
    required: false,
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrdersSchema);
