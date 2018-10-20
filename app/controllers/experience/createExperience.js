
const Experience = require('../../models/experience');

module.exports.createExperience = async function (ctx) {
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
