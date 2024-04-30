const connection = require('../Config/config');
const bookModel = ((callback) => {
    let sqlQuery = 'SELECT * FROM books_list'
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    });
})




module.exports = bookModel;

