const express = require('express');
const app = express();
const cors = require('cors');
const bookRouter = require('./Routers/book.routes');


app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", bookRouter);


app.get("/books/:id",(req,res)=>{

})



app.listen(4000, (err) => {
    if (err) {
        console.log('error', err);
    } else {
        console.log('server listening on 4000')
    }
})