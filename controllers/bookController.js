const { booksData } = require('../utils/booksData')

// Get books
const get_books = (req, res) => {
  res.status(200).json({ books: booksData })
}

// Get a specific book
const get_book = (req, res) => {
  const { bookId } = req.params
  const book = booksData.find((book) => book.id == bookId)
  res.status(200).json({ book })
}

module.exports = {
  get_book,
  get_books,
}
