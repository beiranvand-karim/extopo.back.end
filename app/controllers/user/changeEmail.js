const User = require('../../models/user');

exports.changeEmailController = async ctx => {

  if (ctx.isAuthenticated()) {
    const userId = ctx.session.passport.user;
    const { userName } = ctx.request.body;
    const response = await User.updateOne({ _id: userId }, { userName });
    if (response.ok) {
      ctx.status = 200;
      return ctx.body = 'user name updated successfully.';
    }
  }
  ctx.status = 401;
  return ctx.body = 'NOT Authenticated';
};
