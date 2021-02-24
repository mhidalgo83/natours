const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell ys your name.'],
    trim: true,
    maxlength: [40, 'A user must have 40 characters or less.'],
    minlength: [10, 'A user must have 10 characters or more.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true,
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your challenge'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
