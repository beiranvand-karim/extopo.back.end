'use strict';

const dotEnv = require('dotenv');


// Load environment variables from .env file
dotEnv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'Extopo',
    host: process.env.APP_HOST || '0.0.0.0',
    port: 7070
  },
  production: {
    mongodbUri: 'mongodb://karim:karim123@localhost:27017/extopo',
    port: process.env.APP_PORT || 7071
  },
  development: {
    mongodbUri: 'mongodb://karim:karim123@localhost:27017/extopo',
  },
  test: {
    mongodbUri: 'mongodb://karim:karim123@localhost:27017/extopo',
    port: 7072,
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
