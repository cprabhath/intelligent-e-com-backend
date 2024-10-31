//Purpose: report controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const ReportSchema = require("../model/ReportSchema");
const ProductSchema = require("../model/ProductSchema");
const OrderSchema = require("../model/OrdersSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Templete Report----------------//
const createReport = async (reportType) => {
  const currentDate = new Date();
  let startOfPeriod, endOfPeriod;

  if (reportType === "daily") {
    startOfPeriod = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    endOfPeriod = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    );
  } else if (reportType === "monthly") {
    startOfPeriod = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    endOfPeriod = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
  } else if (reportType === "yearly") {
    startOfPeriod = new Date(currentDate.getFullYear(), 0, 1);
    endOfPeriod = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
  }
  // Fetch all unique categories
  const categories = await ProductSchema.distinct("category");

  let reportData = [];
  // Process each category
  for (const category of categories) {
    let report;
    // Check if a report for this category already exists for the period
    const existingReport = await ReportSchema.findOne({
      label: category,
      createdAt: { $gte: startOfPeriod, $lte: endOfPeriod },
    });
    // Skip to next category if report already exists
    if (existingReport) {
      report = existingReport;
    } else {
      const products = await ProductSchema.find({
        $and: [
          { category: category },
          {
            $or: [
              { createdAt: { $gte: startOfPeriod, $lte: endOfPeriod } },
              { updatedAt: { $gte: startOfPeriod, $lte: endOfPeriod } },
            ],
          },
        ],
      });

      const totalIncomeResult = await OrderSchema.aggregate([
        { $unwind: "$products" },
        { 
          $match: {
            "products.category": category,
            createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
          }
        },
        {
          $group: {
            _id: "$products.category",
            totalIncome: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
          }
        }
      ]);

      let totalIncome = 0;
      if (totalIncomeResult.length > 0) {
        totalIncome = totalIncomeResult[0].totalIncome;
      }

      let totalExpense = 0;
      products.forEach((product) => {
        totalExpense += product.price * product.qtyOnHand;
      });

      report = new ReportSchema({
        label: category,
        income: totalIncome,
        expense: totalExpense,
        createdAt: new Date(),
      });

      // Save the new report
      await report.save();
    }
    reportData.push(report);
  }

  return reportData;
};
//-----------------------------------------------------//

//------------------Daily Report----------------//
const createDailyReport = async (req, res) => {
  try {
    const dailyReportData = await createReport("daily");
    res.status(200).json({
      data: dailyReportData,
    });
  } catch (err) {
    ResponseService(
      res,
      500,
      "Internal Server Error",
      "Failed to create daily report",
      err.message
    );
  }
};
//-----------------------------------------------------//

//------------------Monthly Report----------------//
const createMonthlyReport = async (req, res) => {
  try {
    const dailyReportData = await createReport("monthly");
    res.status(200).json({
      data: dailyReportData,
    });
  } catch (err) {
    ResponseService(
      res,
      500,
      "Internal Server Error",
      "Failed to create daily report",
      err.message
    );
  }
};
//-----------------------------------------------------//

//------------------Yearly Report----------------//
const createYearlyReport = async (req, res) => {
  try {
    const dailyReportData = await createReport("yearly");
    res.status(200).json({
      data: dailyReportData,
    });
  } catch (err) {
    ResponseService(
      res,
      500,
      "Internal Server Error",
      "Failed to create daily report",
      err.message
    );
  }
};
//-----------------------------------------------------//

//-----------------------------------------------------//

//------------------Exporting Functions----------------//
module.exports = {
  createDailyReport,
  createMonthlyReport,
  createYearlyReport,
};
