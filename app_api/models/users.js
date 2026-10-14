const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

// generate a salted password hash
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 310000, 64, 'sha512').toString('hex');
};

// validate a submitted password
userSchema.methods.validPassword = function (password) {
  if (!this.salt || !this.hash) return false;

  const hash = crypto.pbkdf2Sync(password, this.salt, 310000, 64, 'sha512');
  const storedHash = Buffer.from(this.hash, 'hex');

  return hash.length === storedHash.length &&
    crypto.timingSafeEqual(hash, storedHash);
};

// generate a jwt for an authenticated user
userSchema.methods.generateJwt = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email,
      name: this.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

mongoose.model('User', userSchema);