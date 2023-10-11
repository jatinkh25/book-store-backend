const mongoose = require('mongoose')
const bookSchema = require('./Book')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User Id is required'],
  },
  books: [bookSchema],
})

// Cart model
const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart
