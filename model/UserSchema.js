const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: false,
  },
  mobileNumber: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
    default: "https://example.com/default.jpg",
  },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
}, { timestamps: true });

module.exports = mongoose.model("User", UsersSchema);
