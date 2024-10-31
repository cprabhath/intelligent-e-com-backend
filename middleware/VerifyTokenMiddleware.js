// Purpose: Auth middleware to verify token

//------------------Importing Packages----------------//
const verifyToken = require("../services/VerifyTokenService");
const ResponseService = require("../services/ResponseService");
//----------------------------------------------------//

//------------------Auth Middleware----------------//
const verifyUserToken = async (req, res, next) => {
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
        next();
      }
    } catch (error) {
      ResponseService(res, 403, error);
    }
  }
};
//------------------------------------------------//

//------------------Export module----------------//
module.exports = verifyUserToken;
//------------------------------------------------//
