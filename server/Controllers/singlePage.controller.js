const { getSingleBooks } = require('../Models/book.models');

const singleBook = (req, res) => {
    const bookID = req.params.id;
    getSingleBooks(bookID, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        return res.json(result);
    })
};

module.exports = singleBook;
