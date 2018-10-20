const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

const resumeSchema = new Schema({
  skills: { type: [String], required: true },
  experiences: { type: [ObjectId], required: true },
  languages: { type: [String], required: true },
  projects: { type: [ObjectId], required: true },
});

resumeSchema.index({ skills: 'text', experiences: 'text' });

const Resume = mongoose.model('resume', resumeSchema);

module.exports = Resume;
