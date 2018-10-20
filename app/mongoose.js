const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = async () => {
  await mongoose.connect('mongodb://karim:karim123@ds235022.mlab.com:35022/extopo', { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('connection to databbaes has been made.');
  }).on('error', (error) => {
    console.log('connection error: ', error);
  });
};
