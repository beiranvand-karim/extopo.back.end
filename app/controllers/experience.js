
const Experience = require('../models/experience');

exports.createExperience = async function (ctx) {
  if (ctx.isAuthenticated()) {
    const { name, description, year } = ctx.request.body;

    const newExperience = new Experience({ name, description, year });

    const result = await newExperience.save();

    if (result) {
      return ctx.res.ok({
        message: 'experience created'
      });
    }

    return ctx.res.ok({
      message: 'experience NOT created.'
    });
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated.'
    });
  }
};


exports.readExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    const experience = await Experience.findById(ctx.params.id);

    if (experience) {
      const { name, description, year, _id } = experience;
      return ctx.body = {
        name,
        description,
        year,
        _id
      };
    } else {
      return ctx.res.ok({
        message: 'the experience NOT found.'
      });
    }
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated.'
    });
  }
};
