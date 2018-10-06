
const User = require('../models/user');

exports.signUpController =  async function (ctx, next) {
  const {username, password} = ctx.request.body;

  const user = await User.findOne({username});

  if (user) {
    return ctx.body = {
      error: 'user already in use'
    }
  }

  const newUser = new User({ username, password });
  await newUser.save();

  const token = newUser.generateToken();

  return ctx.body = {
    message: 'user registered.',
    token
  };

};
