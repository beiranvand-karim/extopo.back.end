
const Score = require('../../models/score');

exports.createScore = async function (ctx) {
  try {
    ctx.verifyParams({
      fastness: { type: 'number', required: true },
      responsiveness: { type: 'number', required: true },
      friendliness: { type: 'number', required: true },
      quality: { type: 'number', required: true },
      score: { type: 'number', required: true },
      employeeId: { type: 'string', required: true },
      employerId: { type: 'string', required: true },
      projectId: { type: 'string', required: true },
    });
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.errors.map((val) => {
      return val.field + ' ' + val.message;
    });
    return;
  }

  if (ctx.isAuthenticated()) {
    try {
      const { fastness, responsiveness, friendliness, quality, score, employeeId, employerId, projectId } = ctx.request.body;
      // create section
      const newExperience = new Score({ fastness, responsiveness, friendliness, quality, score, employeeId, employerId, projectId });
      const response = await newExperience.save();

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
