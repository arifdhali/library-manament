const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginModels = require('../Models/login.models');
const loginController = {
    getLogin: (req, res) => {
        return res.json({ status: true });
    },
    postLogin: (req, res) => {
        const { email, password } = req.body;
        loginModels(email, (err, results) => {
            if (err) {
                return res.json({ status: false, message: "Server Error" });
            }
            if (results.length === 0) {
                return res.json({ status: false, message: "User not found" });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.json({ status: false, message: err.message });
                }
                if (result) {
                    let token = jwt.sign(
                        { user: user },
                        "secretKey",
                        { expiresIn: "1d" }
                    );
                    res.cookie("loginToken", token, { httpOnly: true });
                    return res.json({ status: true, message: "Login successful" });
                } else {
                    return res.json({ status: false, message: "Incorrect email or password" });
                }
            });
        });
    }
}

module.exports = loginController;