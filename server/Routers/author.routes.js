const express = require("express");
const router = express.Router();
const uploadMulter = require("../Utils/multerConfig");



const singleBookController = require("../Controllers/singlePage.controller");

// Update Controller
const updateController = require("../Controllers/updateBook.controller");

// Delete controller
const deleteBookController = require("../Controllers/deleteBook.controller");

// All books
const allBooksController = require("../Controllers/allBook.controller");
const addBookController = require("../Controllers/addBook.controllers");
const bookStatusController = require("../Controllers/bookStatus.controller");



// Route Author

router.get("/", (req, res) => {
        return res.json({ status: true, author_data: req.user });
})

const updateBook =  uploadMulter("books");
// ADD NEW BOOK
router.post("/add-books", updateBook.single('thumbnail'), addBookController);

// GET THE EDIT PAGE DATA
router.get("/all-books/edit-book/:id", singleBookController);

// All books
router.get("/all-books", allBooksController);

// UPDATE THE EDIT PAGE DATA
let updateBoook = uploadMulter("books");
router.put('/all-books/edit-book/:id', updateBoook.single('thumbnail'), updateController);

// DELETE SELECTED BOOK
router.delete("/all-books/delete-book/:id", deleteBookController);


// UPDATE BOOK STATUS
router.patch("/all-books/:id", bookStatusController);


module.exports = router;