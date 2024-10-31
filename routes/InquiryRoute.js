// Purpose: to route the Inquiry requests to the controller

//--------------------Importing Packages----------------//
const express = require("express");
const inquiryController = require("../controller/InquiryController");
const inquiryReportController = require("../controller/InquiryCountController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const checkRole = require("../middleware/CheckAdminMiddleware");
const router = express.Router();
//-----------------------------------------------------//

//---------------------Inquiry Routes-----------------//
//-----------------Access Level: Admin----------------//
router.delete("/delete-by-id/:id", checkRole, inquiryController.deleteById);

router.get("/get-daily-inquiry-count", checkRole, inquiryReportController.dailyInquiryCount);

router.get("/get-monthly-inquiry-count", checkRole, inquiryReportController.monthlyInquiryCount);

router.get("/get-yearly-inquiry-count", checkRole, inquiryReportController.yearlyInquiryCount);

router.get("/find-all", checkRole, inquiryController.findAll);

router.put("/mark-as-answered/:id", checkRole, inquiryController.markAsAnswered);

//-----------------Access Level: User----------------//
router.post("/create", inquiryController.create);
//---------------------------------------------------//

//--------------------Export module----------------//
module.exports = router;
//--------------------------------------------------//