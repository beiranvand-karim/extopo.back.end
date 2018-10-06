const passport = require('koa-passport');

exports.signInController = async function (ctx, next) {
  return passport.authenticate('local', (err, user) => {
    if (err || !user) {
      ctx.throw(401);
    }

    const token = user.generateToken();

    const response = user.toJSON();

    delete response.password;

    ctx.body = {
      token,
      user: response
    };
  })(ctx, next);
};
