/* global describe, it, expect, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const Review = require('../../../app/models/review');
const review = require('./review.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'review';
const readRoute = `/${route}`;
const createRoute = `/${route}`;

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

describe(`GET ${readRoute}`, () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post(createRoute)
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).get(readRoute);
    expect(response.status).toEqual(401);
  });

  it(`should read ${route}(s) 200`, async () => {
    const response = await request(app).get(readRoute)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    await Review.deleteMany({});
    const response = await request(app).get(readRoute)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
