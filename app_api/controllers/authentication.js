const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// register a new user and generate a jwt
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    // create a new user
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase()
    });

    // hash the password before saving
    user.setPassword(password);
    await user.save();

    // return the authentication token
    return res.status(201).json({
      token: user.generateJwt()
    });
  } catch (err) {
    // handle duplicate email addresses
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Email address is already registered.'
      });
    }

    return next(err);
  }
};

// authenticate a user and generate a jwt
const login = (req, res, next) => {
  const { email, password } = req.body;

  // validate required fields
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  // authenticate using passport
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    // reject invalid credentials
    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Authentication failed.'
      });
    }

    // return a jwt for valid credentials
    try {
      return res.status(200).json({
        token: user.generateJwt()
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = {
  register,
  login
};