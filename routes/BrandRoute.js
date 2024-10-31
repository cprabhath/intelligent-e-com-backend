// Purpose: to route the Brand requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const BrandController = require("../controller/BrandController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Brand Routes----------------//
router.post("/create", verifyToken, BrandController.create);

router.get("/find-by-id/:id", verifyToken, BrandController.findById);

router.delete("/delete-by-id/:id", verifyToken, BrandController.deleteById);

router.put("/update/:id", verifyToken, BrandController.update);

router.get("/find-all", BrandController.findAll);

router.get("/brand-count", verifyToken, BrandController.count);
//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//