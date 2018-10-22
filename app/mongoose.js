const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = async () => {
  await mongoose.connect('mongodb://karim:karim123@localhost:27017/extopo', { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('connection to databbaes has been made.');
  }).on('error', (error) => {
    console.log('connection error: ', error);
  });
};
