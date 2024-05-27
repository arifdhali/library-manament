// controllers/homeController.js
const { getAllActiveBooks } = require('../Models/book.models');

const getHome = (req, res) => {

    // Modal codes
    getAllActiveBooks((err, result) => {
        if (err) {
            return res.json({ status: false, message: err.message });
        } else {
            return res.json({ status: true, data: result });
        }
    });
};

module.exports = {
    getHome
};
