const { Router } = require('express')
const cartController = require('../controllers/cartController')
const router = Router()

router.get('/cart/:userId', cartController.get_cart_books)
router.post('/cart', cartController.add_book)
router.delete('/cart/:userId/:bookId', cartController.delete_book)

module.exports = router
