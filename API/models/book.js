const mongoose = require("mongoose");


const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});


module.exports = mongoose.model('Book', bookSchema);