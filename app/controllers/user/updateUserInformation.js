'use strict';

const User = require('../../models/user');
const route = 'user';

exports.updateUserInformationController = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        userName: { type: 'string', required: true },
        firstName: { type: 'string', required: true },
        lastName: { type: 'string', required: true },
        userType: { type: 'string', required: true }
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { userName, firstName, lastName, userType } = ctx.request.body;
      const updatedFields = {};
      const userId = ctx.session.passport.user;

      (userName) && Object.assign(updatedFields, { userName });
      (firstName) && Object.assign(updatedFields, { firstName });
      (lastName) && Object.assign(updatedFields, { lastName });
      (userType) && Object.assign(updatedFields, { userType });

      const response = await User.updateOne({ _id: userId }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = `the ${route} updated.`;
      }
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
