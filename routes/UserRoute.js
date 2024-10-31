// Purpose: to route the User requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();
//---------------------------------------------------//

//------------------Login and Reg Routes----------------//
router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/find-all", userController.findAll);

router.get("/find-one/:id", userController.findOne);

router.put("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

router.get("/count", userController.count);

router.post('/forgot', userController.forgotPassword);

router.post('/reset/:token/:email', userController.resetPassword);

router.get('/verify/:token', userController.verifyEmail);

//--------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
