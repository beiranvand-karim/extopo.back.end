
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const experienceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Date, required: true }
});

const Experience = mongoose.model('experience', experienceSchema);

exports = Experience;
