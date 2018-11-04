'use strict';

const Review = require('../../models/review');

exports.updateReview = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        description: { type: 'string', required: true },
        point: { type: 'number', required: false },
        employerId: { type: 'string', required: false },
        employeeId: { type: 'string', required: false },
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

      const updatedFields = {};

      (description) && Object.assign(updatedFields, { description });
      (point) && Object.assign(updatedFields, { point });
      (employerId) && Object.assign(updatedFields, { employerId });
      (employeeId) && Object.assign(updatedFields, { employeeId });

      // update section
      const response = await Review.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the survey updated.';
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
