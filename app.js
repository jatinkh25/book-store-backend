const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const cartRoutes = require('./routes/cartRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')
const { FRONTEND_URL } = require('./utils/constants')
require('dotenv').config()

const app = express()

const corsConfig = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke
}

// middleware
app.use(express.json())
app.use(cors(corsConfig))

// database connection
const dbURI = process.env.MONGODB_SERVER_URL

mongoose
  .connect(dbURI)
  .then(() => app.listen(3001))
  .catch((err) => console.log(err))

// routes
// app.get('*', checkUser)
app.get('/cart/:userId', requireAuth)
app.post('/cart', requireAuth)
app.delete('/cart/:userId/:bookId', requireAuth)

app.use(authRoutes)
app.use(bookRoutes)
app.use(cartRoutes)
