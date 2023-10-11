const Cart = require('../models/Cart')

// Fetch books from a user's cart
const get_cart_books = async (req, res) => {
  const { userId } = req.params

  try {
    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(200).json({ books: [] })
    }

    res.json({ books: cart.books })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Add a book to the cart
const add_book = async (req, res) => {
  const { userId, bookId: _id, bookName, price } = req.body

  try {
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({ userId })
    }

    // Check for duplicate book
    const existingBook = cart.books.find((book) => book._id === _id)
    if (existingBook) {
      return res.status(400).json({ error: 'Book with the given ID already exists in the cart.' })
    }

    cart.books.push({ _id, bookName, price })
    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a book from the cart
const delete_book = async (req, res) => {
  const { userId, bookId } = req.params

  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }

    cart.books = cart.books.filter((book) => book._id !== bookId)
    console.log(cart)
    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  get_cart_books,
  add_book,
  delete_book,
}
