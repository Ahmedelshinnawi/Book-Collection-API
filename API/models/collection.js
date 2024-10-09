const mongoose = require("mongoose");


const collectionSchema = mongoose.Schema({
    collectionName: {type: String, required: true},
    collection: [{type: String, required: true}]
});


module.exports = mongoose.model('Collection', collectionSchema);