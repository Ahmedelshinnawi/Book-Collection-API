const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /books"
    });
});

router.post("/", (req, res, next) => {
    const book = {
        title: req.body.title,
        author: req.body.author
    }

    res.status(201).json({
        message: "Handling POST requests to /books",
        addedBook: book

    });
});


router.get("/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    if(id  === 'special'){
        res.status(200).json({
            message: "You discovered the special ID",
            id: id
        });
    }
    else{
        res.status(200).json({
            message: "You entered an some ID"
        });
    }
});


router.patch("/:bookId", (req, res, next) => {
    res.status(200).json({
        message: "Updated book!"
    });
});

router.delete("/:bookId", (req, res, next) => {
    res.status(200).json({
        message: "Deleted book!"
    });
});

router.post("/:bookId", (req, res, next) => {
    res.status(201).json({
        message: "Added book!"
    });
});


module.exports = router;