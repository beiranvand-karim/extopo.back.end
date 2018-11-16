'use strict';

const Score = require('../../models/score');

exports.updateScore = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        fastness: { type: 'number', required: false },
        responsiveness: { type: 'number', required: false },
        friendliness: { type: 'number', required: false },
        quality: { type: 'number', required: false },
        score: { type: 'number', required: false },
        employeeId: { type: 'string', required: false },
        employerId: { type: 'string', required: false },
        projectId: { type: 'string', required: false },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.errors.map((val) => {
        return val.field + ' ' + val.message;
      });
      return;
    }
    try {
      const { fastness, responsiveness, friendliness, quality, score, employeeId, employerId, projectId } = ctx.request.body;

      const updatedFields = {};

      (fastness) && Object.assign(updatedFields, { fastness });
      (responsiveness) && Object.assign(updatedFields, { responsiveness });
      (friendliness) && Object.assign(updatedFields, { friendliness });
      (quality) && Object.assign(updatedFields, { quality });
      (score) && Object.assign(updatedFields, { score });
      (employeeId) && Object.assign(updatedFields, { employeeId });
      (employerId) && Object.assign(updatedFields, { employerId });
      (projectId) && Object.assign(updatedFields, { projectId });

      // update section
      const response = await Score.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the survey updated.';
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
