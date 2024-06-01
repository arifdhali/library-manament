// models/bookModel.js
const connection = require('../Config/config');

const Book = {
    getAllActiveBooks: ((res) => {
        let sql = 'SELECT * FROM books_list WHERE status = true';

        connection.query(sql, (err, result) => {
            if (err) {
                return res(err, null);
            } else {
                return res(null, result);
            }

        })

    }),

    getSingleBooks: ((bookID, res) => {
        let singleQyery = "select * from books_list where book_id = ?";
        connection.query(singleQyery, [bookID], (err, result) => {
            if (err) {
                return res(err, null);
            } else {
                return res(null, result);
            }
        })

    }),

    deleteBooks: ((bookID, res) => {
        let removeSql = 'DELETE FROM books_list WHERE book_id = ?';
        connection.query(removeSql, [bookID], (err, result) => {
            if (err) {
                return res(err, null);
            }
            return res(null, result);

        })



    })


};

module.exports = Book;
