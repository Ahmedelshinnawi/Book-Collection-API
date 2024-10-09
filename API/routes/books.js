const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Book = require("../models/book");
// const book = require("../models/book");

router.get("/", (req, res, next) => {
   Book.find()
   .select("title author finished _id")
   .exec()
   .then(docs => {
         const response ={
            count: docs.length,
            books: docs.map(doc =>{
                return {
                    title: doc.title,
                    author: doc.author,
                    finished: doc.finished,
                    _id: doc._id,
                    request:{
                        type: "GET",
                        url: "http://localhost:3000/books/" + doc._id
                    }
                   
                };
            })
         };
         res.status(200).json(response);
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
        author: req.body.author,
        finished: req.body.finished
    });
    book.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Book added successfully",
            addedBook: {
                title: result.title,
                author: result.author,
                finished: result.finished,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/books/" + result._id
                }
            }
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
    .select("title author finished _id")
    .exec()
    .then(doc => {
        console.log("From database", doc);
       if(doc){
        res.status(200).json({
            book: doc,
            request: {
                type: "GET",
                url: "http://localhost:3000/books"
            }
        });
        
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
       res.status(200).json({
              message: "Book updated",
              request: {
                type: "GET",
                url: "http://localhost:3000/books/" + id
              }
       });
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
        res.status(200).json({
            message: "Book deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/books/",
                data: { title: "String", author: "String", finished: "String" }
              }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


module.exports = router;