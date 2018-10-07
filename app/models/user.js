
const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const employeeSchema = require('../models/employee');
const employerSchema = require('../models/employer');


const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: false, unique: true },
  passWord: { type: String, required: true },
  lastLogin: { type: Date, required: true },
  registrationDate: { type: Date, required: true },
  userType: { type: employerSchema || employeeSchema, required: true }
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bCrypt.genSalt(10);
    this.passWord = await bCrypt.hash(this.passWord, salt);
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.isValidPassword = async function (newPassWord) {
  try {
    return await bCrypt.compare(newPassWord, this.passWord);
  } catch (e) {
    throw new Error(e);
  }
};

userSchema.methods.generateToken = function () {
  return jwt.sign({
    iss: 'codeworkr',
    sub: this.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'secret');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
