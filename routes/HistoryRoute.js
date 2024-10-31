// Purpose: to route the History requests to the controller

//--------------------Importing Packages----------------//
const express = require("express");
const historyController = require("../controller/HistoryController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const checkRole = require("../middleware/CheckAdminMiddleware");
const router = express.Router();
//-----------------------------------------------------//

//--------------------History Routes----------------//

//-----------------Access Level: Admin----------------//
router.delete("/delete-by-id/:id", checkRole,historyController.deleteById);

//-----------------Access Level: User----------------//
router.post("/create", verifyToken, historyController.create);

router.get("/find-by-id/:id", verifyToken, historyController.findById);

router.delete("/find-all", verifyToken, historyController.findAll);
//-------------------------------------------------//

//--------------------Export module----------------//
module.exports = router;
//-------------------------------------------------//