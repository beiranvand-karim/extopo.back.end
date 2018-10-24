
const Resume = require('../../models/resume');


exports.updateResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // const { name, description, date, employees, employer } = ctx.body;
      const { skills, experiences, languages, projects, coverLetter } = ctx.request.body;

      const updatedFields = {};

      (skills) && Object.assign(updatedFields, { skills });
      (experiences) && Object.assign(updatedFields, { experiences });
      (languages) && Object.assign(updatedFields, { languages });
      (projects) && Object.assign(updatedFields, { projects });
      (coverLetter) && Object.assign(updatedFields, { coverLetter });

      // update section
      const response = await Resume.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the resume updated.';
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
