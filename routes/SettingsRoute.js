//Purpose: to route the settings requests to the controller

//------------------Importing Packages----------------//
const express = require("express");
const router = express.Router();
const settingsController = require("../controller/SettingsController");
const checkRole = require("../middleware/CheckAdminMiddleware");
//-----------------------------------------------------//

//------------------Settings Routes--------------------//
//-----------------Access Level: Admin----------------//
router.post("/create", checkRole, settingsController.create);
router.get("/find-all", settingsController.getAll);
router.put("/update/:id", checkRole, settingsController.update);
//---------------------------------------------------//

//--------------------Export module----------------//
module.exports = router;
//--------------------------------------------------//
