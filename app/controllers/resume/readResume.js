
const Resume = require('../../models/resume');

exports.readResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Resume.findById(ctx.params.id);
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
