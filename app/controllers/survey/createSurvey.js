
const Survey = require('../../models/survey');

exports.createSurvey = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        workForceCount: { type: 'string', required: true },
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
      const newSurvey = new Survey({ workForceCount, demandedSkills, projectType, projectDescription });
      const response = await newSurvey.save();

      if (response) {
        ctx.status = 201;
        return ctx.body = response;
      }
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
