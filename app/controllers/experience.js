
const Experience = require('../models/experience');

exports.createExperience = async function (ctx) {
  const { name, description, year } = ctx.request.body;

  console.log(name, description, year);

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
};
