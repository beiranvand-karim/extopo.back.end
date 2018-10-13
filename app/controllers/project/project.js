
const Project = require('../../models/project');

exports.createProject = async ctx => {
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
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

exports.updateProject = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // const { name, description, date, employees, employer } = ctx.body;
      const { name, description, date, employees, employer } = ctx.request.body;

      const updatedFields = {};

      (name) && Object.assign(updatedFields, { name });
      (description) && Object.assign(updatedFields, { description });
      (date) && Object.assign(updatedFields, { date });
      (employees) && Object.assign(updatedFields, { employees });
      (employer) && Object.assign(updatedFields, { employer });

      // update section
      const response = await Project.updateOne({ _id: ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the project updated.';
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


exports.deleteProject = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // delete section
      const response = await Project.deleteOne({ _id: ctx.params.id });
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the project deleted.';
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
