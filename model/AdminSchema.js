// Purpose: to create a schema for the admin collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Admin Schema----------------//
const AdminSchema = new mongoose.Schema({
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

  OTP: {
    type: String,
    required: false,
  },

  role: {
    type: String,
    required: true,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  imageUrl: {
    type: String,
    required: false,
  },

  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });
//--------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Admin", AdminSchema);
//-----------------------------------------------//