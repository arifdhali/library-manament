// Models/newAccount.models.js

const connection = require("../Config/config");

const checkEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], callback);
};

const insertUser = (user, callback) => {
    const query = "INSERT INTO users (author_id, user_image, name, email, address, age, phone_number, gender, country, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, user, callback);
};

module.exports = {
    checkEmail,
    insertUser
};
