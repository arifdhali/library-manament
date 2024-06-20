const { addBooks } = require("../Models/book.models");


const addBookController = (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ status: false, message: "No file uploaded" });
    }

    const { filename: thumbnail } = req.file;
    const { author_id } = req.user;
    const { title, authors, publication, plot, themes, impact, legacy, price } = req.body;

    addBooks(author_id, title, authors, publication, plot, themes, impact, legacy, thumbnail, price, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Error sending data to Database"
            });
        } else {
            return res.json({
                status: true,
                message: "Successfully added new book"
            });
        }
    });
};

module.exports = addBookController;
