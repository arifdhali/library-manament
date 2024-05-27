// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const { getHome } = require('../Controllers/home.controller');

router.get('/', getHome);

module.exports = router;
