const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "library_managment"
})


connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('Database connection established');
    }
})

module.exports = connection;