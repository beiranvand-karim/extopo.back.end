const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

exports.signInController = async function (ctx, next) {
  return passport.authenticate('local',  (err, user) => {
    if (err || !user) {
      ctx.throw(401);
    }

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
