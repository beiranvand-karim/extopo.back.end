/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const Review = require('../../../app/models/review');
const review = require('./review.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = '/review';

beforeAll((done) => {
  signIn(app)
    .then(_cookie => {
      cookie = _cookie;
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('GET ' + route, () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post(route)
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).get(route);
    expect(response.status).toEqual(401);
  });

  it('should read a survey 200', async () => {
    const response = await request(app).get(route)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    await Review.deleteMany({});
    const response = await request(app).get(route)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
