const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, 'Book Id is required.'],
  },
  bookName: {
    type: String,
    required: [true, 'Book Name is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Book Price is required.'],
  },
})

module.exports = bookSchema
