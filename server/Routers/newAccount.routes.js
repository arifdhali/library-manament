const express = require('express');
const newAccountController = require('../Controllers/newAccount.controllers');
const uploadMulter = require('../Utils/multerConfig');
const router = express.Router();

// ADD BOOK
let uploadProfile = uploadMulter("author"); // Multer upload folder name

router.post("/", uploadProfile.single('profile'), newAccountController);
module.exports = router;