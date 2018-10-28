/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../../app/index').listen();

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
      // save the token!
      token = response.body.token;
      if(response.headers['set-cookie'].length > 1) {
        cookie = response
          .headers['set-cookie']
          .map(item => item.split(';')[0])
          .join(';');
      }else{
        cookie = response
          .headers['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0])
          .join(';');
      }
      done();
    });
});

async function promisedAuthRequest() {
  try {
    const res = await request(app).post('/sign-in')
      .send({
        userName: 'beiranvand.karim@gmail.com',
        passWord: 'karim'
      });
    return res.body.token;
  } catch (err) {
    throw (err);
  }
}

describe('routes', () => {
  it('hits a private route with superagent authentication', async () => {
    const response = await request(app).get('/project')
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
});

