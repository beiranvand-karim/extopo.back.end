
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


exports.readAllExperiences = async (ctx) => {
  if (ctx.isAuthenticated()) {
    const experiences = await Experience.find();
    return ctx.body = experiences;
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated.'
    });
  }
};

exports.deleteExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    const response = await Experience.deleteOne({ '_id': ctx.params.id });

    const message = response.n === 1 ? 'the experience removed.' : 'no such experience found.';
    return ctx.body = {
      message
    };
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated.'
    });
  }
};

exports.updateExperience = async ctx => {
  if (ctx.isAuthenticated()) {
    const { name, description, year } = ctx.request.body;

    const response = await Experience.updateOne({ '_id': ctx.params.id }, { name, description, year });

    const message = response.n === 1 ? 'the experience updated.' : 'no such experience found.';

    return ctx.body = {
      message
    };
  } else {
    return ctx.res.ok({
      message: 'user NOT authenticated.'
    });
  }
};
