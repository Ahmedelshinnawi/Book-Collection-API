const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },    
  });
const collectionSchema = mongoose.Schema({
    collectionName: {type: String, required: true},
    collection: [bookSchema]
});


module.exports = mongoose.model('Collection', collectionSchema);