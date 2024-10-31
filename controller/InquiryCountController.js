// Description: Handles inquiry count requests

//-------------------Importing Packages----------------//
const Inquiry = require("../model/InquirySchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------//

//--------Function to get the start of the day, month, or year------//
const getStartOfPeriod = (date, period) => {
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  if (period === "monthly") {
    day = 1;
  } else if (period === "yearly") {
    month = 0;
    day = 1;
  }

  return new Date(year, month, day);
};
//------------------------------------------------------------------//

//--------Function to count inquiries in a period------//
const countInquiries = async (period) => {
  const currentDate = new Date();
  const startOfPeriod = getStartOfPeriod(currentDate, period);

  const count = await Inquiry.countDocuments({
    createdAt: { $gte: startOfPeriod },
    isAnswered: false,
  });

  return count;
};
//-----------------------------------------------------//

//------------------Inquiry Daily Count----------------//
const dailyInquiryCount = async (req, res) => {
  try {
    const count = await countInquiries("daily");
    res.json({ dailyCount: count });
  } catch (err) {
    ResponseService(res, 500, err.message);
  }
};
//-----------------------------------------------------//

//------------------Inquiry Monthly Count--------------//
const monthlyInquiryCount = async (req, res) => {
  try {
    const count = await countInquiries("monthly");
    res.json({ monthlyCount: count });
  } catch (err) {
    ResponseService(res, 500, err.message);
  }
};
//-----------------------------------------------------//

//------------------Inquiry Yearly Count---------------//
const yearlyInquiryCount = async (req, res) => {
  try {
    const count = await countInquiries("yearly");
    res.json({ yearlyCount: count });
  } catch (err) {
    ResponseService(res, 500, err.message);
  }
};
//-----------------------------------------------------//

module.exports = {
  dailyInquiryCount,
  monthlyInquiryCount,
  yearlyInquiryCount,
};
