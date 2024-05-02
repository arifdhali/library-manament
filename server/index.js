const express = require('express');
const app = express();
const cors = require('cors');
const bookRouter = require('./Routers/book.routes');
const connection = require('./Config/config');
const bcrypt = require('bcrypt');



app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

// sign up 

app.post("/signup", (req, res) => {
    const { name, email, address, age, phone, gender, country, password } = req.body;

    // Hash the password
    let checkEmail = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmail, [email], (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Error checking email" });
        }

        if (result.length > 0) {
            return res.json({ success: false, message: "Email already exists" });
        }

        let saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.json({ success: false, message: "Error generating or decrypt password" });
            }

            let insertUser = 'INSERT INTO users (name, email, address, age, phone_number, gender, country, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertUser, [name, email, address, age, phone, gender, country, hash], (err, result) => {
                if (err) {
                    return res.json({ success: false, message: err.message });
                } else {
                    return res.redirect("/");
                }
            });
        });
    });
});



app.listen(4000, (err) => {
    if (err) {
        console.log('error', err);
    } else {
        console.log('server listening on 4000')
    }
})