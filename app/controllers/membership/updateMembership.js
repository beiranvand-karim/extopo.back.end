const Membership = require('../../models/membership');

module.exports.updateMembership = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        userId: { type: 'string', required: false },
        userType: { type: 'string', required: false },
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

      const updatedFields = {};

      (userId) && Object.assign(updatedFields, { userId });
      (userType) && Object.assign(updatedFields, { userType });

      // update section
      const response = await Membership.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the membership updated';
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
