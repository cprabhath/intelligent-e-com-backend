//Purpose: Inquiry controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const InquirySchema = require("../model/InquirySchema");
const ResponseService = require("../services/ResponseService");
const emailService = require("../services/EmailService");
//-----------------------------------------------------------------//

//------------------Inquiry Create----------------//
const create = (req, resp) => {
  const inquirySchema = new InquirySchema({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    isAnswered: req.body.isAnswered,
  });

  inquirySchema
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Inquiry created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Inquiry marked as answered-----------//
const markAsAnswered = (req, resp) => {
  InquirySchema.findByIdAndUpdate({ _id: req.params.id }, { isAnswered: true })
    .then((data) => {
      if (!data) {
        return ResponseService(
          resp,
          404,
          "Inquiry not found with id " + req.params.id
        );
      } else {
        
        const loginLink = "http://localhost:5173/";

        const emailContent =
          "Your inquiry has been successfully completed. Please check your account for more details.";

        emailService.sendEmail(resp, data.email, "Inquiry Completed", {
          heading: "Inquiry Completed",
          action: "Login",
          username: data.name,
          link: loginLink,
          message: emailContent,
        });
        return ResponseService(resp, 200, "Inquiry marked as answered");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};

//------------------Inquiry Delete By Id---------//
const deleteById = (req, resp) => {
  InquirySchema.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return ResponseService(
          resp,
          404,
          "Inquiry not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "Inquiry deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Inquiry Find All-------------//
const findAll = (req, resp) => {
  InquirySchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Inquiry Count----------------//
const count = (req, resp) => {
  //check isAnswered is false then count
  InquirySchema.countDocuments({ isAnswered: false })
    .then((data) => {
      resp.send(data.toString());
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Exporting Modules-------------//
module.exports = {
  create,
  markAsAnswered,
  deleteById,
  findAll,
  count,
};
//-----------------------------------------------//
