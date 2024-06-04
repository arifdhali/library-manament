const express = require('express');
const router = express.Router();
const loginController = require("../Controllers/login.controllers");


// GET CONTROLLER
router.get("/login", loginController);


module.exports = router;

