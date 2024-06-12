const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./Config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const path = require("path");

const userAuthentication = require('./Auth/login.auth');
const homeRoutes = require("./Routers/home.routes");
const bookRoutes = require("./Routers/book.routes");
const loginRoutes = require("./Routers/login.routes");
const newAccountRoutes = require("./Routers/newAccount.routes")

const uploadMulter = require("./Utils/multerConfig");

app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PATCH,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Home routes
app.use("/", homeRoutes);

// Single page Book
app.use("/book", bookRoutes);

// Login handel
app.use('/login', loginRoutes)

// Sign up
app.use("/signup", newAccountRoutes);


// Updte book
// let updateBoook = uploadMulter("books");
// app.use("/author/all-books", updateBoook.single('thumbnail'), bookRoutes);


// Delete book
// app.use("/author/all-books", bookRoutes);


app.get("/author", userAuthentication, (req, res) => {
    return res.json({ status: true, author_data: req.user });
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

// // All books
// app.get("/author/all-books", userAuthentication, (req, res) => {
//     const { author_id } = req.user;

//     console.log('test')

//     // get all books from this author_id
//     let sql = "SELECT * FROM books_list WHERE user_id = ?";

//     connection.query(sql, [author_id], (err, result) => {
//         if (err) {
//             return res.json({
//                 status: false,
//                 message: "Error on getting all books informations",
//             });
//         } else {
//             return res.json({
//                 status: true,
//                 all_books: result,
//             });
//         }
//     });
// });

// // updaate single row || column
// app.patch("/author/edit-books/:id", (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     let updateSql = "UPDATE books_list SET status = ? WHERE book_id = ?";

//     connection.query(updateSql, [status, id], (err, result) => {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: "Something went wrong",
//             });
//         } else {
//             console.log(result);
//             return res.status(200).json({
//                 status: true,
//                 message: "Status updated successfully",
//             });
//         }
//     });
// });

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