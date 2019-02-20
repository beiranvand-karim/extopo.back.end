'use strict';

const Experience = require('../../models/experience');
const route = 'experience';

exports.updateExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        name: { type: 'string', required: false },
        description: { type: 'string', required: false },
        year: { type: 'number', required: false },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { name, description, year } = ctx.request.body;

      const updatedFields = {};

      (name) && Object.assign(updatedFields, { name });
      (description) && Object.assign(updatedFields, { description });
      (year) && Object.assign(updatedFields, { year });

      const response = await Experience.updateOne({ _id: ctx.params.id }, updatedFields);

      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = `the ${route} updated.`;
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
