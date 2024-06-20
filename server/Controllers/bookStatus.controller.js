const { updateStatus } = require("../Models/book.models");

const bookStatusController = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    updateStatus(status, id, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
            });
        } else {
            return res.status(200).json({
                status: true,
                message: "Status updated successfully",
            });
        }
    })

}

module.exports = bookStatusController;
