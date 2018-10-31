
const Survey = require('../../models/survey');

exports.createSurvey = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        workForceCount: { type: 'number', required: true },
        demandedSkills: { type: 'array', required: true },
        projectType: { type: 'string', required: true },
        projectDescription: { type: 'string', required: true },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { workForceCount, demandedSkills, projectType, projectDescription } = ctx.request.body;
      // create section
      const newResume = new Survey({ workForceCount, demandedSkills, projectType, projectDescription });
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
