const express = require('express');
const router = express.Router();
const singleBookController = require("../Controllers/singlePage.controller");

// single page
router.get("/:id", singleBookController);

// Edit page
router.get("/edit-book/:id", singleBookController);

module.exports = router;
