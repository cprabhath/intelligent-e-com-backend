// Purpose: to route the report requests to the controller

//-------------------Importing Packages----------------//
const express = require("express");
const router = express.Router();
const reportController = require("../controller/ReportController");
const checkRole = require("../middleware/CheckAdminMiddleware");
//-----------------------------------------------------//

//------------------Report Routes--------------------//
//-----------------Access Level: Admin----------------//
router.get("/get-daily-report", checkRole, reportController.createDailyReport);

router.get("/get-monthly-report", checkRole, reportController.createMonthlyReport);

router.get("/get-yearly-report", checkRole, reportController.createYearlyReport);

//--------------------Export module----------------//
module.exports = router;