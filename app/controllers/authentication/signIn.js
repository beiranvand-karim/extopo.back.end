const passport = require('koa-passport');
const User = require('../../models/user');

exports.signInController = async function (ctx) {
  return passport.authenticate('local', async (err, user) => {
    if (err || !user) {
      ctx.throw(401);
    }

    try {
      const fetchedUser = await User.findOne({ userName: user.userName });

      await User.updateOne({ _id: fetchedUser.id }, { lastLogIn: new Date() });

      const token = user.generateToken();

      const response = user.toJSON();

      delete response.passWord;

      ctx.status = 200;
      ctx.body = { token, response };

      // Login user in order to save token in session
      return ctx.login(user);
    }catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  })(ctx);
};
