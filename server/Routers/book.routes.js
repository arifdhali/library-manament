const express = require('express');
const router = express.Router();
const singleBookController = require("../Controllers/singlePage.controller");

// Update Controller
const updateController = require("../Controllers/updateBook.controller");

// Delete controller
const deleteBookController = require("../Controllers/deleteBook.controller");


// single page
router.get("/:id", singleBookController);

// GET THE EDIT PAGE DATA
router.get("/edit-book/:id", singleBookController);

// UPDATE THE EDIT PAGE DATA
router.put('/edit-book/:id', updateController);



// DELETE SELECTED BOOK
router.delete("/delete-book/:id", deleteBookController);

module.exports = router;
