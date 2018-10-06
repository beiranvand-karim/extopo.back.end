'use strict';

exports.testAuth = ctx => {
  // create user
  console.log(ctx.isAuthenticated());
  return ctx.res.ok({
    message: 'TestAuth'
  });
};
