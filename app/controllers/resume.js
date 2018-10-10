
const Resume = require('../models/resume');

exports.createResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const { skills, experiences, languages, projects } = ctx.request.body;
      // create section
      const newResume = new Resume({ skills, experiences, languages, projects });
      const response = await newResume.save();

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
