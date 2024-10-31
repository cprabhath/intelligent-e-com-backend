// Purpose: to route the product requests to the controller

//-------------------Importing Packages----------------//
const express = require("express");
const productController = require("../controller/ProductController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
const checkRole = require("../middleware/CheckAdminMiddleware");
//-----------------------------------------------------//

//------------------Product Routes--------------------//
//-----------------Access Level: Admin----------------//
router.post("/create", checkRole, productController.create);
router.delete("/delete-by-id/:id", checkRole, productController.deleteById);
router.put("/update/:id", checkRole, productController.update);
router.get("/count", checkRole, productController.count);
router.post("/recommend", productController.recommendProducts);
//---------------------------------------------------//

//-----------------Access Level: User----------------//
router.get("/find-by-id/:id", productController.findById);
router.get("/find-all", productController.findAll);
router.get('/search', productController.searchProducts)
router.put('/updateQty/:id', productController.updateQuantity)
//--------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
