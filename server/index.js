const express = require('express');
const app = express();
const cors = require('cors');
const bookRouter = require('./Routers/book.routes');
const connection = require('./Config/config');


app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", bookRouter);


app.get("/books/:id", (req, res) => {

    const bookID = req.params.id;

    let sqlqyery = 'select * from books_list where book_id = ?';

    connection.query(sqlqyery, [bookID], (err, result) => {

        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
            return;
        }        

        return res.json(result);
    })

})


app.listen(4000, (err) => {
    if (err) {
        console.log('error', err);
    } else {
        console.log('server listening on 4000')
    }
})