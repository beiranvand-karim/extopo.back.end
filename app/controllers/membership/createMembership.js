
const Membership = require('../../models/membership');

module.exports.createMembership = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        userId: { type: 'string', required: true },
        userType: { type: 'string', required: true },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { userId, userType } = ctx.request.body;
      // create section
      const newMembership = new Membership({ startDate: new Date(), endDate: new Date(), userId, userType });
      const response = await newMembership.save();

      if (response) {
        ctx.status = 201;
        return ctx.body = response;
      }
      // not found section
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
