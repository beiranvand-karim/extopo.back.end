
const Resume = require('../models/resume');

exports.createResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const { skills, experiences, languages, projects } = ctx.request.body;
      // create section
      const newResume = new Resume({ skills, experiences, languages, projects });
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

exports.readResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Resume.findById(ctx.params.id);
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

exports.readAllResumes = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Resume.find();
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


exports.updateResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // const { name, description, date, employees, employer } = ctx.body;
      const { skills, experiences, languages, projects } = ctx.request.body;

      const updatedFields = {};

      (skills) && Object.assign(updatedFields, { skills });
      (experiences) && Object.assign(updatedFields, { experiences });
      (languages) && Object.assign(updatedFields, { languages });
      (projects) && Object.assign(updatedFields, { projects });

      // update section
      const response = await Resume.updateOne({ '_id': ctx.params.id }, updatedFields);
      if (response.n === 1) {
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

exports.deleteResume = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // delete section
      const response = await Resume.deleteOne({ '_id': ctx.params.id });
      if (response.n === 1) {
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
