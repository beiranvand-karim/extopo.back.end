
const Experience = require('../../models/experience');

exports.createExperience = async function (ctx) {
  try {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      description: { type: 'string', required: true },
      year: { type: 'number', required: true },
    });
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.errors.map((val) => {
      return val.field + ' ' + val.message;
    });
    return;
  }

  if (ctx.isAuthenticated()) {
    try {
      const { name, description, year } = ctx.request.body;
      // create section
      const newExperience = new Experience({ name, description, year });
      const response = await newExperience.save();

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
