'use strict';

const Resume = require('../../models/resume');
const route = 'resume';

exports.updateResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        skills: { type: 'array', required: false },
        experiences: { type: 'array', required: false },
        languages: { type: 'array', required: false },
        projects: { type: 'array', required: false },
        coverLetter: { type: 'string', required: false },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
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
