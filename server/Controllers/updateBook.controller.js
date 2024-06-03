const { updateBooks } = require("../Models/book.models");

const updateBookController = (req, res) => {
    const bookID = req.params.id;

    // Destructure request body
    const {
        title,
        authors,
        publication,
        plot,
        themes,
        impact,
        legacy,
        price
    } = req.body;

    // Check if the file exists in the request
    const thumbnail = req.file ? req.file.filename : req.body.thumbnail;

    // Validate inputs
    if (!title || !authors || !publication || !plot || !themes || !impact || !legacy || !price) {
        return res.status(400).json({ status: false, message: "Missing required fields" });
    }

    // Prepare update data
    const updateData = {
        title,
        authors,
        publication,
        plot,
        themes,
        impact,
        legacy,
        thumbnail,
        price
    };

    // Call the model function to update the book in the database
    updateBooks(bookID, updateData, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ status: false, message: "Internal Server Error" });
        }
        return res.status(200).json({ status: true, message: "Book updated successfully", result });
    });
};

module.exports = updateBookController;
