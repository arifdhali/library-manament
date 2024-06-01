const { deleteBooks } = require("../Models/book.models");
const deleteBook = (req, res) => {
    const bookID = req.params.id;
    deleteBooks(bookID, (err, result) => {
        if (err) {
            return res.json({
                status: false,
                message: "Failed to delete your book"
            });
        }
        return res.json({
            status: true,
            message: "Book deleted successfully"
        });
    });
}


module.exports = deleteBook;