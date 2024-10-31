// Purpose: to route the Cart requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const cartController = require("../controller/CartController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Cart Routes----------------//
router.post("/create", cartController.create);

router.get("/find-by-id/:id", cartController.findById);

router.delete("/delete-by-id/:userId/:productId", cartController.deleteById);

router.put("/update/:id", cartController.update);

router.get("/find-all", cartController.findAll);

router.delete("/delete-all/:id", cartController.deleteByUserId);

//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
