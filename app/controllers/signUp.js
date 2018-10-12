
const User = require('../models/user');

exports.signUpController =  async function (ctx) {
  try {
    const { userName, passWord, firstName, lastName, userType } = ctx.request.body;

    const user = await User.findOne({ userName });

    if (user) {
      ctx.status = 409;
      return ctx.body = 'user already in use.';
    }

    const fields = {};

    (userName) && Object.assign(fields, { userName });
    (passWord) && Object.assign(fields, { passWord });
    (firstName) && Object.assign(fields, { firstName });
    (lastName) && Object.assign(fields, { lastName });
    (userType) && Object.assign(fields, { userType });

    const newUser = new User({
      ...fields,
      registrationDate: new Date(),
      lastLogIn: new Date()
    });

    const saveUser = await newUser.save();

    delete saveUser.passWord;

    const token = newUser.generateToken();

    ctx.status = 201;
    return ctx.body = { token, saveUser };
  } catch (e) {
    ctx.status = 500;
    return ctx.body = e.message;
  }
};
