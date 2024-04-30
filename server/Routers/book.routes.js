const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controllers');

router.use("/", bookController);


module.exports = router;
