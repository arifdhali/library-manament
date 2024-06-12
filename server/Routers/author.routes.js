const express = require("express");
const router = express.Router();
const uploadMulter = require("../Utils/multerConfig");



const singleBookController = require("../Controllers/singlePage.controller");

// Update Controller
const updateController = require("../Controllers/updateBook.controller");

// Delete controller
const deleteBookController = require("../Controllers/deleteBook.controller");




// GET THE EDIT PAGE DATA
router.get("/edit-book/:id", singleBookController);

// UPDATE THE EDIT PAGE DATA
let updateBoook = uploadMulter("books");
router.put('all-books/edit-book/:id',updateBoook.single('thumbnail'), updateController);

// DELETE SELECTED BOOK
router.delete("/all-books/delete-book/:id", deleteBookController);


module.exports = router;