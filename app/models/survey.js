const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const surveySchema = new Schema({
  workForceCount: { type: String, enum: ['single talent', 'two or more', 'whole team', 'no idea'], required: true },
  demandedSkills: { type: [String], required: true },
  projectType: { type: String, enum: ['design', 'web app', 'front end', 'back end', 'data science', 'AI', 'game', 'mobile', 'website'], required: true },
  projectDescription: { type: String, required: true }
});

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;
