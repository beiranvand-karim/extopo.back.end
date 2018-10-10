
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


exports.readProject = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Project.findById(ctx.params.id);
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

exports.readAllProjects = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Project.find();
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};
