const mongoose = require('mongoose');
const configs = require('./config/index');
mongoose.Promise = global.Promise;

module.exports = async () => {
  await mongoose.connect(configs.mongodbUri, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('connection to databbaes has been made.');
  }).on('error', (error) => {
    console.log('connection error: ', error);
  });
};
