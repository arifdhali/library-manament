// Controllers/newAccount.controllers.js

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { checkEmail, insertUser } = require('../Models/newAccount.models');

const newAccountController = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, message: "No file uploaded" });
    }
    const { filename: user_image } = req.file;
    const { name, email, address, age, phone, gender, country, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Error generating or encrypting password",
            });
        }

        // Check if email already exists
        checkEmail(email, (err, result) => {
            if (err) {
                return res.status(500).json({ status: false, message: "Error checking email" });
            }

            if (result.length > 0) {
                return res.status(400).json({ status: false, message: "Email already exists" });
            }

            // Insert new user into the database
            const user = [uuidv4(), user_image, name, email, address, age, phone, gender, country, hash];
            insertUser(user, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: false, message: err.message });
                }
                return res.status(200).json({
                    status: true,
                    message: "Successfully created your account",
                });
            });
        });
    });
};

module.exports = newAccountController;
