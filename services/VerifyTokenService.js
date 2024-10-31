// Purpose: jwt verify token

//------------------Importing Packages----------------//
const jwt = require("jsonwebtoken");
//----------------------------------------------------//

//------------------Secret Key--------------------//
const secretKey = process.env.SECRET_KEY;
//------------------------------------------------//

//------------------Verify Token----------------//
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err.message);
                return
            } else {
                resolve(decoded);
            }
        });
    });
}
//

//------------------Export module----------------//
module.exports = verifyToken;
//------------------------------------------------//