const express = require("express");
const router = express.Router();
const userAuthentication = require("../Auth/login.auth");

const { getLogin, postLogin } = require("../Controllers/login.controllers");

// GET CONTROLLER
router.get("/", userAuthentication, getLogin);

router.post("/", postLogin);

module.exports = router;
