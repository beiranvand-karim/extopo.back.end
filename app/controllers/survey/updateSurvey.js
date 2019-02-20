'use strict';

const Survey = require('../../models/survey');
const route = 'survey';

exports.updateSurvey = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        workForceCount: { type: 'string', required: false },
        demandedSkills: { type: 'array', required: false },
        projectType: { type: 'string', required: false },
        projectDescription: { type: 'string', required: false },
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
      const { workForceCount, demandedSkills, projectType, projectDescription } = ctx.request.body;

      const updatedFields = {};

      (workForceCount) && Object.assign(updatedFields, { workForceCount });
      (demandedSkills) && Object.assign(updatedFields, { demandedSkills });
      (projectType) && Object.assign(updatedFields, { projectType });
      (projectDescription) && Object.assign(updatedFields, { projectDescription });

      // update section
      const response = await Survey.updateOne({ _id: ctx.params.id }, updatedFields);
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
