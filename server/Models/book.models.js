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
    updateBooks: ((ID, data, callback) => {
        const fields = [];
        const values = [];

        // Dynamically construct the SET clause of the SQL query
        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        console.log(fields);

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
