
const Experience = require('../../models/experience');

exports.readAllExperiences = async (ctx) => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Experience.find();
      if (response) {
        ctx.status = 200;
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
