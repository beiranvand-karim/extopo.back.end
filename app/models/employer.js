
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const employerSchema = new Schema({
  name: { type: String, required: true }
});


const Employer = mongoose.model('employer', employerSchema);

exports = Employer;
