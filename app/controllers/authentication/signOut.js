

exports.signOutController = ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 200;
    return ctx.body = 'user successfully signed out.';
  }

  ctx.status = 200;
  return ctx.body = 'user is already signed out.';
};
