/* global describe, it */
'use strict';

const request = require('supertest');
const app = require('../../index').listen();
const User = require('../../models/user');

// const { expect } = require('chai');

afterEach(() => {
  // app.close()
});

let token;
let cookie;

beforeAll((done) => {
  request(app)
    .post('/sign-in')
    .send({
      'userName': 'beiranvand.karim@gmail.com',
      'passWord': 'karim'
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      cookie = response
          .headers['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0])
          .join(';')
      done();
    });
});

async function promisedAuthRequest() {
  try {
    const res = await request(app).post('/sign-in').send({
      userName: 'beiranvand.karim@gmail.com',
      passWord: 'karim'
    })
    return res.body.token
  } catch (err) {
    throw (err)
  }
}

describe('routes', () => {
  it('hits a private route with superagent authentication', async () => {
    const response = await request(app).get('/project').set('Cookie', cookie)
    expect(response.status).toEqual(200);
  });

});
