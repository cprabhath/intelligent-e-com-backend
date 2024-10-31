// Purpose: to route the Categories requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const CategoriesController = require("../controller/CategoriesController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Categories Routes----------------//
router.post("/create", verifyToken, CategoriesController.create);

router.get("/find-by-id/:id", verifyToken, CategoriesController.findById);

router.delete("/delete-by-id/:id", verifyToken, CategoriesController.deleteById);

router.put("/update/:id", verifyToken, CategoriesController.update);

router.get("/find-all", verifyToken, CategoriesController.findAll);

router.get("/categories-count", verifyToken, CategoriesController.count);

//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//