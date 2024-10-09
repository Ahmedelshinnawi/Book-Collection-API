const mongoose = require("mongoose");


const collectionSchema = mongoose.Schema({
    collection:{type: mongoose.Schema.Types.ObjectId,ref: 'Book'},
    quantity: {type: Number, default: 1}
});


module.exports = mongoose.model('Collection', collectionSchema);