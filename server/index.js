const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./Config/config');
const bcrypt = require('bcrypt');
var session = require('express-session')
const { v4: uuidv4 } = require('uuid');



app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'library test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))



// user authentication || middleware to handle login
const userAuthentication = (req, res, next) => {

    if (!req.session.login) {
        res.json({ login: false, message: "Please login" })
    } else {
        next();
    }

}
app.get("/", (req, res) => {
    let sqlQuery = 'SELECT * FROM books_list'
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            return res.json({ status: false, message: err.message })
        } else {
            return res.json({ status: true, data: result })
        }
    });
});

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
// sign in
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const emailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(emailQuery, [email], (err, results) => {
        if (err) {
            return res.json({ status: false, message: "Server Error" });
        }
        if (results.length === 0) {
            return res.json({ status: false, message: "User not found" });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({ status: false, message: err.message });
            }
            if (result) {
                req.session.user = user;
                req.session.login = true;
                return res.json({ status: true, message: "Login successful", login: req.session.login });
            } else {
                return res.json({ status: false, message: "Incorrect email or password." });
            }
        });
    });
});

// sign up 
app.post("/signup", (req, res) => {
    const { name, email, address, age, phone, gender, country, password } = req.body;

    // Hash the password
    let checkEmail = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmail, [email], (err, result) => {
        if (err) {
            return res.json({ status: false, message: "Error checking email" });
        }

        if (result.length > 0) {
            return res.json({ status: false, message: "Email already exists" });
        }

        let saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.json({ status: false, message: "Error generating or decrypt password" });
            }

            let insertUser = 'INSERT INTO users (author_id,name, email, address, age, phone_number, gender, country, password) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertUser, [uuidv4(), name, email, address, age, phone, gender, country, hash], (err, result) => {
                if (err) {
                    return res.json({ status: false, message: err.message });
                } else {
                    req.session.user = email;
                    req.session.login = true;
                    return res.json({ status: true, message: "Successfully create your account", login: req.session.login });
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