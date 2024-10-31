// Purpose: to route the Order requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const orderController = require("../controller/OrderController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Order Routes----------------//
router.post("/create", orderController.create);

router.get("/find-by-id/:id", orderController.findById);

router.delete("/delete-by-id/:id", orderController.deleteById);

router.put("/update/:id", verifyToken, orderController.update);

router.get("/find-all", verifyToken, orderController.findAll);

router.get("/count", verifyToken, orderController.count);
//-----------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
