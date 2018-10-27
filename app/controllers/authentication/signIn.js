const passport = require('koa-passport');
const User = require('../../models/user');

exports.signInController = async function (ctx) {
  try {
    ctx.verifyParams({
      userName: { type: 'string', required: true },
      passWord: { type: 'string', required: true }
    });
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.errors.map((val) => {
      return val.field + ' ' + val.message;
    });
    return;
  }

  return passport.authenticate('local', async (err, user) => {
    if (err || !user) {
      ctx.throw(401);
    }

    try {
      await User.updateOne({ userName: user.userName }, { lastLogIn: new Date() });

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
