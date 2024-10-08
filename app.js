const express = require("express");
const app = express();

const bookRoutes = require("./API/routes/books")

app.use('/books', bookRoutes);

module.exports = app;