// Used for admin and login

//------------------Importing Packages----------------//
const AdminSchema = require("../model/AdminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("../services/EmailService");
const { v4: uuidv4 } = require("uuid");
const ResponseService = require("../services/ResponseService");
const verifyToken = require("../services/VerifyTokenService");
//----------------------------------------------------//

const salt = 10;
const loginUrl = `${process.env.BASEURL}/api/v1/admin/admin-login`;

//------------------User Login------------------//
const login = (req, res) => {
  // Checking email exists
  AdminSchema.findOne({ email: req.body.email }).then((selectedUser) => {
    if (selectedUser === null) {
      return ResponseService(res, 404, "Email not found");
    } else {
      // Comparing Password
      bcrypt.compare(
        req.body.password,
        selectedUser.password,
        (err, result) => {
          if (err) {
            return ResponseService(res, 500, err.message);
          } else if (result) {
            // Checking Email Verified
            if (!selectedUser.emailVerified) {
              return ResponseService(
                res,
                401,
                "Please activate your account first. Check your email for activation link."
              );
            }
            // Creating Token
            const payload = {
              email: selectedUser.email,
              userId: selectedUser._id,
              role: selectedUser.role,
            };
            // Secret Key
            const secretKey = process.env.SECRET_KEY;
            const expiresIn = "24h";
            const token = jwt.sign(payload, secretKey, {
              expiresIn: expiresIn,
            });
            // Sending Token
            return ResponseService(res, 200, { token, selectedUser });
          } else {
            return ResponseService(res, 401, "Incorrect password");
          }
        }
      );
    }
  });
};
//----------------------------------------------//

//-----------------User register-----------------//
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const token = uuidv4();
    const user = new AdminSchema({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      emailVerificationToken: token,
      emailVerificationExpires: Date.now() + 3600000,
    });

    const email = encodeURIComponent(req.body.email);
    const verifyUrl = `http://localhost:5173/#/verify-email/${token}/${email}`;
    const emailContent = `Thank you for registering. Please click on below button to verify your email.`;

    emailService
      .sendEmail(res, req.body.email, "Verify Email", {
        heading: "Verify Email",
        username: "User",
        action: "Verify Email",
        link: verifyUrl,
        title: "Verify your email address",
        message: emailContent,
      })
      .then((emailSent) => {
        if (emailSent) {
          user
            .save()
            .then(() => {
              return ResponseService(
                res,
                200,
                "Registration successful. Please check your email for verification link."
              );
            })
            .catch((err) => {
              return ResponseService(res, 500, err.message);
            });
        } else {
          return ResponseService(res, 500, "Error occurred.");
        }
      })
      .catch((err) => {
        return ResponseService(res, 500, err.message);
      });
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};

//---------------find email and send reset link----------//
const forgotPassword = async (req, res) => {
  try {
    const token = uuidv4();
    const user = await AdminSchema.findOne({ email: req.body.email });

    if (!user) {
      return ResponseService(
        res,
        404,
        "No account with that email address exists."
      );
    } else if (user.emailVerified === false) {
      return ResponseService(
        res,
        401,
        "Please activate your account first. Check your email for activation link."
      );
    }
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    const email = encodeURIComponent(user.email);

    const resetUrl = `http://localhost:5173/#/reset-password/${token}/${email}`;
    const emailContent = `You requested a password reset. Click on below button to reset your password. This Link only valid for one hour`;

    emailService
      .sendEmail(res, req.body.email, "Reset Password", {
        heading: "Reset Password",
        username: "User",
        action: "Reset Password",
        link: resetUrl,
        title: "Reset your account password",
        message: emailContent,
      })
      .then((emailSent) => {
        if (emailSent) {
          user.save().then(() => {
            return ResponseService(
              res,
              200,
              "Password reset link sent to your email."
            );
          });
        } else {
          return ResponseService(res, 500, "Error occurred.");
        }
      })
      .catch((err) => {
        return ResponseService(res, 500, err.message);
      });
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};

//----------------------------------------------//

//----------------------Reset Password----------------------//
const resetPassword = async (req, res) => {
  try {
    const user = await AdminSchema.findOneAndUpdate(
      {
        email: req.params.email,
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: new Date() },
      },
      { new: true }
    );

    if (!user) {
      return ResponseService(
        res,
        401,
        "Password reset token is invalid or has expired."
      );
    }

    const hash = await bcrypt.hash(req.body.password, salt);

    emailService
      .sendEmail(res, req.body.email, "Your Password Changed!", {
        heading: "Your Password  had just Changed!",
        username: "User",
        action: "Login",
        link: loginUrl,
        title: "Your password has been changed!",
        message:
          "Your password has been successfully reset. If you did not initiate this request, please contact our support team immediately.",
      })
      .then((emailSent) => {
        if (emailSent) {
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.save().then(() => {
            return ResponseService(res, 200, "Password has been updated.");
          });
        } else {
          return ResponseService(res, 500, "Error occurred.");
        }
      })
      .catch((err) => {
        return ResponseService(res, 500, err.message);
      });
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};
//----------------------------------------------//

//----------------------update user by id-------------------//
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const update = await AdminSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fullName: req.body.fullName,
          password: hashedPassword,
          email: req.body.email,
          role: req.body.role,
          imageUrl: req.body.imageUrl,
        },
      },
      { new: true }
    );

    if (update) {
      return ResponseService(res, 200, "User updated successfully.");
    } else {
      return ResponseService(res, 404, "User not found.");
    }
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};
//----------------------------------------------------//

//-------------------find all users-------------------//
const findAll = (req, res) => {
  AdminSchema.find()
    .then((users) => {
      return ResponseService(res, 200, users);
    })
    .catch((err) => {
      return ResponseService(res, 500, err.message);
    });
};
//----------------------------------------------------//

//------------------Exporting modules--------------------//
module.exports = {
  login,
  forgotPassword,
  resetPassword,
  updateUser,
  findAll,
  register,
};
//----------------------------------------------------//
