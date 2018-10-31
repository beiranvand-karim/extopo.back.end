const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const surveySchema = new Schema({
  workForceCount: { type: Number, required: true },
  demandedSkills: { type: [String], required: true },
  projectType: { type: String, required: true },
  projectDescription: { type: String, required: true }
});

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;
