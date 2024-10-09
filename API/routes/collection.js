const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Collection = require("../models/collection");
const collection = require("../models/collection");

router.get("/", (req, res, next) => {
    Collection.find()
    .select("collectionName collection _id collection")
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            collections: docs.map(doc => {
                return {
                    collectionName: doc.collectionName,
                    collection: doc.collection,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/collection/" + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


router.post("/", (req, res, next) => {
    const collection = new Collection({
        collection: req.body.collectionId,
        collectionName: req.body.collectionName,
        collection: req.body.collection
    });

    collection.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
                message: "Collection added successfully",
                addedCollection: {
                    collectionName: result.collectionName,
                    collection: result.collection,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/books/" + result._id
                    }
                }
            })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.get("/:collectionId", (req, res, next) => {
    const id = req.params.collectionId;

    Collection.findById(id)
    .select("collectionName collection _id collection")
    .exec()
    .then(doc => {
        console.log("From database", doc);
       if(doc){
        res.status(200).json({
            collection: doc,
            request: {
                type: "GET",
                url: "http://localhost:3000/collection"
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


router.patch("/:collectionId", (req, res, next) => {
    const id = req.params.collectionId;
    const updateOps = {};
    for(const ops of req.body){
     updateOps[ops.propName] = ops.value
    }
    collection.updateOne({ _id: id },{ $set: updateOps  })
    .exec()
    .then(result => {
          console.log(result);
        res.status(200).json({
               message: "Collection updated",
               request: {
                 type: "GET",
                 url: "http://localhost:3000/collection/" + id
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


router.delete("/:collectionId", (req, res, next) => {
    const id = req.params.collectionId;
    Collection.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: "Collection deleted successfully",
            request: {
                type: "POST",
                url: "http://localhost:3000/collection/",
                data: { collection: "String", collectionName: "String"}
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