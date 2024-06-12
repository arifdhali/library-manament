    const connection = require("../Config/config");

    const loginModels = (email, callback) => {
        const emailQuery = "SELECT * FROM users WHERE email = ?";
        connection.query(emailQuery, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, results);
            }
        })

    }

    module.exports = loginModels;