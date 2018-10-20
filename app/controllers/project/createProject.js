
const Project = require('../../models/project');

module.exports.createProject = async ctx => {

  if (ctx.isAuthenticated()) {
    try {
      const { name, description, employer } = ctx.request.body;
      // create section
      const newProject = new Project({ name, description, employer, date: new Date() });
      const response = await newProject.save();

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
