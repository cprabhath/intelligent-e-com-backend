// Configure email
const nodeMailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ResponseService = require("./ResponseService");
const handlebars = require("handlebars");

//------------------ Send Email ------------------//
const sendEmail = async (res, to, subject, data) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../templetes/EmailTemplete.html"
    );
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    const template = handlebars.compile(htmlContent);
    const htmlToSend = template(data);

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return ResponseService(res, 500, error.message);
  }
};
//----------------------------------------------//

//------------------ Export Module--------------//
module.exports = {
  sendEmail,
};
//----------------------------------------------//
