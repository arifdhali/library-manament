// middleware/auth.js
const jwt = require("jsonwebtoken");

const userAuthentication = (req, res, next) => {
    const { loginToken } = req.cookies;
    if (!loginToken) {
        return res.status(401).json({
            status: false,
            message: "You don't have an account, please register",
        });
    } else {
        jwt.verify(loginToken, "secretKey", (err, decode) => {            
            if (err) {
                return res.status(403).json({ status: false, message: "Invalid token" });
            } else {
                req.user = decode.user;
                next();
            }
        });
    }
};
module.exports = userAuthentication;
