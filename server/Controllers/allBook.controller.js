
const { getAllBooks } = require("../Models/book.models")

const allBooksController = (req, res) => {
    const { author_id } = req.user;    
    
    getAllBooks(author_id, (err, result) => {
        if (err) {
            return res.json({
                status: false,
                message: "Error on getting all books informations",
            });
        } else {
            return res.json({
                status: true,
                all_books: result,
            });
        }

    })

}

module.exports = allBooksController;