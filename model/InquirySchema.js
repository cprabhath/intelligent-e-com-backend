//Purpose: to create a schema for the inquiry collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Inquiry Schema----------------//
const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isAnswered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Inquiry", InquirySchema);
//------------------------------------------------//