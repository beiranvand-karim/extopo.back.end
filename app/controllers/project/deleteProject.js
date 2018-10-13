
const Project = require('../../models/project');

module.exports.deleteProject = async ctx => {
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
