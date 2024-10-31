// Purpose: Main file for the application

//----------------- Importing Packages --------------------//
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//--------------------------------------------------------//

//----------------- Importing Files ----------------------//
require("dotenv").config();
const app = express();
//---------------------------------------------------------//

//----------------- route variables ------------------------//
const AdminRoute = require("./routes/AdminRoute");
const UserRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const ProductRoute = require("./routes/ProductRoute");
const CartRoute = require("./routes/CartRoute");
const CategoriesRoute = require("./routes/CategoriesRoute");
const BrandRoute = require("./routes/BrandRoute");
const InquiryRoute = require("./routes/InquiryRoute");
const ReportRoute = require("./routes/ReportRoute");
const SettingsRoute = require("./routes/SettingsRoute");
//---------------------------------------------------------//

//----------------- Environment Variables -----------------//
const PORT = process.env.SERVER_PORT || 3000;
const DB_URL = process.env.DB_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
//---------------------------------------------------------//

//------------------- Body Parser ------------------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//--------------------------------------------------------//

//------------------ Connect to MongoDB ------------------//
try {
  mongoose
    .connect(`${DB_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
} catch (err) {
  console.log(err.message);
}
//-------------------------------------------------------//

//------------------ Server connection ------------------//
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
//------------------------------------------------------//

//------------------------ Routes ----------------------//
try {
  app.use("/api/v1/admin", AdminRoute);
  app.use("/api/v1/orders", OrderRoute);
  app.use("/api/v1/products", ProductRoute);
  app.use("/api/v1/users", UserRoute);
  app.use("/api/v1/cart", CartRoute);
  app.use("/api/v1/categories", CategoriesRoute);
  app.use("/api/v1/brands", BrandRoute);
  app.use("/api/v1/inquiries", InquiryRoute);
  app.use("/api/v1/reports", ReportRoute);
  app.use("/api/v1/settings", SettingsRoute);
} catch (error) {
  console.log(error.message);
}
//------------------------------------------------------//
