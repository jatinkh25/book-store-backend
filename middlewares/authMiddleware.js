const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../utils/constants')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (token) {
    // Checking if json web token exists & is verified
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Token is not valid' })
      } else {
        next()
      }
    })
  } else {
    res.status(500).json({ error: 'Token is not valid' })
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkUser }
