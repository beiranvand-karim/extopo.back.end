'use strict';

const Project = require('../../models/project');
const route = 'project';

module.exports.updateProject = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      ctx.verifyParams({
        name: { type: 'string', required: false },
        description: { type: 'string', required: false },
        // todo could it be array of strings?
        employees: { type: 'array', required: false },
        employer: { type: 'string', required: false }
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
      const { name, description, employees, employer } = ctx.request.body;

      const updatedFields = {};

      (name) && Object.assign(updatedFields, { name });
      (description) && Object.assign(updatedFields, { description });
      (employees) && Object.assign(updatedFields, { employees });
      (employer) && Object.assign(updatedFields, { employer });

      // update section
      const response = await Project.updateOne({ _id: ctx.params.id }, updatedFields);
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
