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
const authorRoutes = require("./Routers/author.routes");

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

// Authore Handle
app.use("/author", userAuthentication, authorRoutes);


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