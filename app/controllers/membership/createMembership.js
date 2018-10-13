
const Membership = require('../../models/membership');

module.exports.createMembership = async ctx => {
  if (ctx.isAuthenticated()) {
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
