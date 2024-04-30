const bookModel = require("../Models/book.models");

const bookController = (req, res) => {
    bookModel((err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error executing book list from database' });
        } else {
            res.json({ success: true, data: result });
        }
    });
}


module.exports = bookController;