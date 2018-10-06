'use strict';

exports.testAuth = ctx => {
  if (ctx.isAuthenticated()) {
    return ctx.res.ok({
      message: 'user IS authenticated.'
    });
  }

  return ctx.res.ok({
    message: 'user is NOT authenticated.'
  });
};
