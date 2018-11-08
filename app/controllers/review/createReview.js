
const Review = require('../../models/review');

exports.createReview = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        description: { type: 'string', required: true },
        point: { type: 'number', required: true },
        employerId: { type: 'string', required: true },
        employeeId: { type: 'string', required: true },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { description, point, employerId, employeeId } = ctx.request.body;
      const newReview = new Review({ description, point, employerId, employeeId });
      const response = await newReview.save();

      if (response) {
        ctx.status = 201;
        return ctx.body = response;
      }
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
