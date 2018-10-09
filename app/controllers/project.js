
const Project = require('../models/project');

exports.createProject = async ctx => {
  if (ctx.isAuthenticated()) {
    const { name, description, employer } = ctx.request.body;

    try {
      const newProject = new Project({ name, description, employer, date: new Date() });
      ctx.body = await newProject.save();
    } catch (e) {
      ctx.body = {
        e
      };
    }
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated'
    });
  }
};
