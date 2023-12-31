const User = require('../models/User')
const Yup = require('yup')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET_KEY, SIGNUP_URL } = require('../utils/constants')

// Validation schema using Yup
const registerSchema = new Yup.ObjectSchema({
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  email: Yup.string().matches(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    'Please enter a valid email.'
  ),
  password: Yup.string()
    .required('Password is required.')
    .min(6, 'Password should be at least six characters long.'),
})

// Function to create a JWT token
const createToken = ({ _id, firstName, lastName, email }) => {
  const payload = {
    id: _id,
    firstName,
    lastName,
    email,
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: 24 * 60 * 60 })
}

// POST route handler for signup
const signup = async (req, res) => {
  const errorObj = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  try {
    // Validate the request body using the schema
    await registerSchema.validate(req.body, {
      abortEarly: false,
    })

    // Check if email already exists
    const isEmailExists = await User.findOne({
      email: req.body.email,
    })

    if (isEmailExists) {
      errorObj.email = 'This email already exists.'
      res.status(400).json(errorObj)
    } else {
      // Create a new user and generate a JWT token
      const user = await User.create(req.body)
      const jwtToken = createToken(user)
      res.status(201).json({ access_token: jwtToken })
    }
  } catch (err) {
    console.log(err)
    // Handle validation errors
    err.inner.forEach((error) => {
      errorObj[error.path] = error.errors[0]
    })

    res.status(400).json(errorObj)
  }
}

// POST route handler for login
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Login the user and generate a JWT token
    const user = await User.login(email, password)
    const jwtToken = createToken(user)
    res.status(200).json({ access_token: jwtToken })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }
}

const logout = (req, res) => {
  res.redirect('/')
}

module.exports = {
  signup,
  login,
  logout,
}
