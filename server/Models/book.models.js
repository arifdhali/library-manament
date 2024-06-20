const connection = require('../Config/config');

const Book = {

    addBooks: (author_id, title, authors, publication, plot, themes, impact, legacy, thumbnail, price, callback) => {
        const addSql = "INSERT INTO books_list (user_id, title, authors, publication, plot, themes, impact, legacy, thumbnail, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            author_id,
            title,
            authors,
            publication,
            plot,
            themes,
            impact,
            legacy,
            thumbnail,
            price,
        ];

        connection.query(addSql, values, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },
    updateStatus: ((status, id, res) => {
        let updateSql = "UPDATE books_list SET status = ? WHERE book_id = ?";
        connection.query(updateSql, [status, id], (err, result) => {
            if (err) {
                return res(err, null);
            } else {
                return res(null, result);
            }

        })

    }),
    getAllBooks: ((id, res) => {
        // get all books from this author_id
        let getBooksql = "SELECT * FROM books_list WHERE user_id = ?";
        connection.query(getBooksql, [id], (err, result) => {
            if (err) {
                return res(err, null);
            } else {
                return res(null, result);
            }

        })

    }),
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
    updateBooks: ((ID, data, callback) => {
        const fields = [];
        const values = [];

        // Dynamically construct the SET clause of the SQL query
        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        // Join fields with commas for the SQL SET clause
        const updateSql = `UPDATE books_list SET ${fields} WHERE book_id = ?`;


        // Execute the query
        connection.query(updateSql, [...values, ID], (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
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
