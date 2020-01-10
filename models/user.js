const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
      type: String,
      unique: true,
      required: true
  },
  createdAt: {
      type: Date,
      default: moment().toISOString(),
      required: true
  },
  updatedAt: {
      type: Date,
      default: moment().toISOString(),
      required: true
  }
});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const user = mongoose.model('user', userSchema);

module.exports = user;