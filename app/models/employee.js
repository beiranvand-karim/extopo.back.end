
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const employeeSchema = new Schema({
  name: { type: String, required: true }
});


const Employee = mongoose.model('employee', employeeSchema);

exports = Employee;
