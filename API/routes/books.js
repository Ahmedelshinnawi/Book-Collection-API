const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Book = require("../models/book");
// const book = require("../models/book");

router.get("/", (req, res, next) => {
   Book.find()
   .exec()
   .then(docs => {
         console.log(docs);
         res.status(200).json(docs);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error:err
    });
   });
});

router.post("/", (req, res, next) => {
    const book = new Book ({
        title: req.body.title,
        author: req.body.author
    });
    book.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /books",
            addedBook: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
   
});


router.get("/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
       if(doc){
        res.status(200).json(doc);
       }
       else{
        res.status(404).json({
            message: "No entry found with this ID"
        });
       }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
          });
    });
});


router.patch("/:bookId", (req, res, next) => {
   const id = req.params.bookId;
   const updateOps = {};
   for(const ops of req.body){
    updateOps[ops.propName] = ops.value
   }
   Book.updateOne({ _id: id },{ $set: updateOps  })
   .exec()
   .then(result => {
         console.log(result);
       res.status(200).json(result);
   })
   .catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err
      });
   });
});



router.delete("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    Book.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


module.exports = router;