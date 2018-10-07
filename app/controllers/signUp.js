
const User = require('../models/user');

exports.signUpController =  async function (ctx, next) {
  const { userName, passWord } = ctx.request.body;

  const user = await User.findOne({ userName });

  if (user) {
    return ctx.body = {
      error: 'user already in use'
    };
  }

  const newUser = new User({ userName, passWord });
  await newUser.save();

  const token = newUser.generateToken();

  return ctx.body = {
    message: 'user registered.',
    token
  };
};
