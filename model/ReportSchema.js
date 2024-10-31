// Purpose: to create a schema for the report collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Report Schema----------------//
const ReportSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },

    income: {
      type: Number,
      required: true,
    },

    expense: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Report", ReportSchema);
//------------------------------------------------//
