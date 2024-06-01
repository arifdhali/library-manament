const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./Config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const path = require("path");

const homeRoutes = require("./Routers/home.routes");
const bookRoutes = require("./Routers/book.routes");

const uploadMulter = require("./Utils/multerConfig");

app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PATCH,PUT",
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// user authentication || middleware to handle login
const userAuthentication = (req, res, next) => {
    const { loginToken } = req.cookies;
    if (!loginToken) {
        return res.json({
            status: false,
            message: "You don't have account, please register",
        });
    } else {
        jwt.verify(loginToken, "secretKey", (err, decode) => {
            if (err) {
                return res.json({ status: false, message: "Invalid token" });
            } else {
                req.user = decode.user;
                logedInUser = decode.user;
                next();
            }
        });
    }
};


// Home routes
app.use("/", homeRoutes);

// Single page Book
app.use('/book', bookRoutes);

// Updte book
app.use("/author/all-books/edit-book", bookRoutes);

app.get("/author", userAuthentication, (req, res) => {
    return res.json({ status: true, author_data: req.user });
});



// login
app.get("/login", userAuthentication, (req, res) => {
    return res.json({ status: true });
});

// sign in
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const emailQuery = "SELECT * FROM users WHERE email = ?";
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
                let token = jwt.sign(
                    {
                        user,
                    },
                    "secretKey",
                    { expiresIn: "1d" }
                );
                res.cookie("loginToken", token);
                return res.json({ status: true, message: "Login successful" });
            } else {
                return res.json({
                    status: false,
                    message: "Incorrect email or password.",
                });
            }
        });
    });
});

// sign up
app.post("/signup", (req, res) => {
    const { name, email, address, age, phone, gender, country, password } =
        req.body;

    // Hash the password
    let checkEmail = "SELECT * FROM users WHERE email = ?";
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
                return res.json({
                    status: false,
                    message: "Error generating or decrypt password",
                });
            }

            let insertUser =
                "INSERT INTO users (author_id,name, email, address, age, phone_number, gender, country, password) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(
                insertUser,
                [uuidv4(), name, email, address, age, phone, gender, country, hash],
                (err, result) => {
                    if (err) {
                        return res.json({ status: false, message: err.message });
                    } else {
                        return res.json({
                            status: true,
                            message: "Successfully create your account",
                        });
                    }
                }
            );
        });
    });
});

// ADD BOOK
let uploadBooks = uploadMulter("books"); // Multer upload folder name

app.post(
    "/author/add-books",
    userAuthentication,
    uploadBooks.single("thumbnail"),
    (req, res) => {
        if (!req.file) {
            return res
                .status(400)
                .json({ status: false, message: "No file uploaded" });
        }

        const { filename: thumbnail } = req.file;
        const { author_id } = req.user;
        const { title, authors, publication, plot, themes, impact, legacy, price } =
            req.body;

        const addSql =
            "INSERT INTO books_list (user_id, title, authors, publication, plot, themes, impact, legacy, thumbnail, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let value = [
            author_id,
            title,
            authors,
            publication,
            plot,
            themes,
            impact,
            legacy,
            thumbnail,
            price,
        ];
        connection.query(addSql, value, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ status: false, message: "Error sending data to Database" });
            } else {
                return res.json({
                    status: true,
                    message: "Successfully added new book",
                });
            }
        });
    }
);

// All books
app.get("/author/all-books", userAuthentication, (req, res) => {
    const { author_id } = req.user;

    // get all books from this author_id
    let sql = "SELECT * FROM books_list WHERE user_id = ?";

    connection.query(sql, [author_id], (err, result) => {
        if (err) {
            return res.json({
                status: false,
                message: "Error on getting all books informations",
            });
        } else {
            return res.json({
                status: true,
                all_books: result,
            });
        }
    });
});

// updaate single row || column
app.patch("/author/all-books/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    let updateSql = "UPDATE books_list SET status = ? WHERE book_id = ?";

    connection.query(updateSql, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
            });
        } else {
            console.log(result);
            return res.status(200).json({
                status: true,
                message: "Status updated successfully",
            });
        }
    });
});

// app logout
app.get("/logout", (req, res) => {
    res.clearCookie("loginToken");
    return res.status(200).json({ status: true, messge: "Logout success" });
});

app.listen(4000, (err) => {
    if (err) {
        console.log("error", err);
    } else {
        console.log("server listening on 4000");
    }
});
