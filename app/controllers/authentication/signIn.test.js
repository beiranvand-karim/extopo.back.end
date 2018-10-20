/* global describe, it */
'use strict';

const request = require('supertest');
const app = require('../../index');
const User = require('../../models/user');


const { expect } = require('chai');

function promisedAuthRequest() {
  const authenticatedagent2b = request.agent(app.listen());
  return new Promise((resolve, reject) => {
    authenticatedagent2b
      .post('/sign-in')
      .send({
        'userName': 'beiranvand.karim@gmail.com',
        'passWord': 'karim'
      })
      .end(function (error, response) {
        if (error) { reject(error); }
        resolve(authenticatedagent2b);
      });
  });
}

function promisedCookie() {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/sign-in')
      .send({
        'userName': 'beiranvand.karim@gmail.com',
        'passWord': 'karim'
      })
      .end(function (error, response) {
        if (error) { reject(error); }
        let loginCookie = response.headers['set-cookie'];
        resolve(loginCookie);
      });
  });
}


describe('routes', () => {

  it('hits a private route with superagent authentication', () => {
    return promisedAuthRequest().then(authenticatedagent => {
      return authenticatedagent.get('/project').expect(200)
        .then(res => {
          expect(res.body.answer).to.equal(42);
        });
    });
  });

  it('hits a private route with supertest authentication and cookie', () => {
    return promisedCookie().then(cookie => {
      console.log('cookie is called', cookie);
      const req = request(app)
        .get('/project')
        .set('cookie', cookie)
        .expect(200)
        .then(res => {
          expect(res.body.answer).to.equal(42);
        });
      return req;
    });
  });
});
