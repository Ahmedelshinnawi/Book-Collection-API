require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./server/config/db");

const bookRoutes = require("./API/routes/books");
const collectionRoutes = require("./API/routes/collection");
const userRoutes = require("./API/routes/user");

connectDB();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*"),
    res.header("Acces-Control-Allow-Origin", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});

    }
    next();
});

app.use('/books', bookRoutes);
app.use('/collection', collectionRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});



module.exports = app;