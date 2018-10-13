
const Experience = require('../models/experience');

exports.createExperience = async function (ctx) {
  if (ctx.isAuthenticated()) {
    try {
      const { name, description, year } = ctx.request.body;
      // create section
      const newExperience = new Experience({ name, description, year });
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


exports.readExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Experience.findById(ctx.params.id);
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found.';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated.';
  }
};


exports.readAllExperiences = async (ctx) => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Experience.find();
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

exports.updateExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const { name, description, year } = ctx.request.body;

      const updatedFields = {};

      (name) && Object.assign(updatedFields, { name });
      (description) && Object.assign(updatedFields, { description });
      (year) && Object.assign(updatedFields, { year });

      const response = await Experience.updateOne({ _id: ctx.params.id }, updatedFields);

      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the experience updated.';
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


exports.deleteExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // delete section
      const response = await Experience.deleteOne({ _id: ctx.params.id });
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the experience deleted.';
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
