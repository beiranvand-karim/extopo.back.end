
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const employeeSchema = new Schema({

});


const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
