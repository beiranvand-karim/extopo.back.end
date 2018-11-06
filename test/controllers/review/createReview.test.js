/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const review = require('./review.meta');

let cookie;
const route = '/review';

beforeAll((done) => {
  request(app)
    .post('/sign-in')
    .send({
      'userName': 'beiranvand.karim@gmail.com',
      'passWord': 'karim'
    })
    .end((err, response) => {
      // save the token!
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

describe('POST ' + route, () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post(route)
      .send(review);
    expect(response.status).toEqual(401);
  });

  it('should create a review 201', async () => {
    const response = await request(app).post(route)
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modified = { ...review, description: 10 };
    const response = await request(app).post(route)
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
