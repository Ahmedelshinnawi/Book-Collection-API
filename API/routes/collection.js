const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Collection was fetched"
    });
});


router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "Collection was created"
    });
});


router.get("/:collectionId", (req, res, next) => {
    res.status(200).json({
        message: "Collection details",
        collectionId: req.params.collectionId
    });
});


router.delete("/:collectionId", (req, res, next) => {
    res.status(200).json({
        message: "Collection deleted",
        collectionId: req.params.collectionId
    });
});

module.exports = router;