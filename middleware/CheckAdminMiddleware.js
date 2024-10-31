// Purpose: Check if user is admin or not

//----------------- Importing Packages --------------------//
const verifyToken = require("../services/VerifyTokenService");
const ResponseService = require("../services/ResponseService");
//--------------------------------------------------------//

//------------------ Check User Middleware ----------------//
const CheckAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    ResponseService(res, 403, "Token is missing");
  } else {
    //verify token
    try {
      const decoded = await verifyToken(token);
      if (!decoded) {
        ResponseService(res, 403, "Invalid Token");
      } else {
        if (decoded.role !== "admin") {
          ResponseService(res, 403, "You are not admin");
        } else {
          next();
        }
      }
    } catch (error) {
      ResponseService(res, 403, error);
    }
  }
};
//---------------------------------------------------------//

//------------------ Export Module--------------//
module.exports = CheckAdmin;
//----------------------------------------------//
