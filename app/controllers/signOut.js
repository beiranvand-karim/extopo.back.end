

exports.signOutController = ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    return ctx.res.ok({
      message: 'user successfully signed out'
    });
  }

  return ctx.res.ok({
    message: 'user is already signed out.'
  });
};
