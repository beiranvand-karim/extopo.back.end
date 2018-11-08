'use strict';

const request = require('supertest');

module.exports.signIn = function (app) {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/sign-in')
      .send({
        'userName': 'beiranvand.karim@gmail.com',
        'passWord': 'karim'
      })
      .then((response) => {
        let cookie = '';
        if(response.headers['set-cookie'].length > 1) {
          cookie = response
            .headers['set-cookie']
            .map(item => item.split(';')[0])
            .join(';');
        } else {
          cookie = response
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';');
        }
        resolve(cookie);
      })
      .catch(err => {
        reject(err);
      });
  });
};

