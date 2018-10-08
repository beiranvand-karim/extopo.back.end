const passport = require('koa-passport');
const User = require('../models/user');

exports.signInController = async function (ctx) {
  return passport.authenticate('local', async (err, user) => {
    if (err || !user) {
      ctx.throw(401);
    }

    const fetchedUser = await User.findOne({ userName: user.userName });

    // User.update({ userName: user.userName }, { lastLogIn: new Date() }, { upsert: true });

    fetchedUser.update({ lastLogIn: new Date() });
    fetchedUser.save();

    const token = user.generateToken();

    const response = user.toJSON();

    delete response.passWord;

    ctx.body = {
      token,
      user: response
    };

    // Login user in order to save token in session
    return ctx.login(user);
  })(ctx);
};
