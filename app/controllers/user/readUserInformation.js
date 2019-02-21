const User = require('../../models/user');

exports.readUserInformationController = async ctx => {
  if (ctx.isAuthenticated()) {
    const userId = ctx.session.passport.user;
    const user = await User.findOne({ _id: userId });
    ctx.status = 200;
    return ctx.body = user;
  }
  ctx.status = 200;
  return ctx.body = 'user is signed out.';
};
