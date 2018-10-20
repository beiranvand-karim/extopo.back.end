
const Experience = require('../../models/experience');

exports.deleteExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // delete section
      const response = await Experience.deleteOne({ _id: ctx.params.id });
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the experience deleted.';
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
