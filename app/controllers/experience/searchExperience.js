
const Experience = require('../../models/experience');

module.exports.searchExperience = async function (ctx) {
  if (ctx.isAuthenticated()) {
    try {
      const { phrase } = ctx.request.body;

      const response = await Experience
        .find({ $text: { $search: phrase } }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });

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
