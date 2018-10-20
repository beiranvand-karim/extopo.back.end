
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const experienceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true }
});

experienceSchema.index({ name: 'text' });

const Experience = mongoose.model('experience', experienceSchema);

module.exports = Experience;
