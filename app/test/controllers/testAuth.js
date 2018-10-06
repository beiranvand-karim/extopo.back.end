'use strict';

const pkginfo = require('../../package.json');
const spec = require('../../spec');

exports.testAuth = ctx => {
  //create user
  console.log(ctx.isAuthenticated())
  return ctx.res.ok({
    message: 'TestAuth'
  });
}
