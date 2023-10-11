const { Router } = require('express')
const bookController = require('../controllers/bookController')
const router = Router()

router.get('/books', bookController.get_books)
router.get('/books/:bookId', bookController.get_book)

module.exports = router
