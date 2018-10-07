

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;


const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  employees: [ObjectId],
  employer: ObjectId
});


const Project = mongoose.model('project', projectSchema);

exports = Project;
