
const Resume = require('../../models/resume');

exports.createResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        skills: { type: 'array', required: true },
        experiences: { type: 'array', required: true },
        languages: { type: 'array', required: true },
        projects: { type: 'array', required: true },
        coverLetter: { type: 'string', required: true }
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { skills, experiences, languages, projects, coverLetter } = ctx.request.body;
      // create section
      const newResume = new Resume({ skills, experiences, languages, projects, coverLetter });
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
