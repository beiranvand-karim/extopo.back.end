
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const employerSchema = new Schema({

});


const Employer = mongoose.model('employer', employerSchema);

module.exports = Employer;
