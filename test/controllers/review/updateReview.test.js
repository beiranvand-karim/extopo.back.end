/* global describe, it, expect, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const review = require('./review.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'review';
const updateRoute = id => `/${route}/${id}`;
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

describe(`PUT ${updateRoute(':id')}`, () => {
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
    const response = await request(app).put(updateRoute(_id))
      .send(review);
    expect(response.status).toEqual(401);
  });

  it(`should update a(n) ${route} 200`, async () => {
    const modified = { ...review, point: 20 };
    const response = await request(app).put(updateRoute(_id))
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
  it('should return bad request 400', async () => {
    const response = await request(app).put(updateRoute(_id))
      .send({
        'point': '10'
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).put(updateRoute(_id))
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
  it('should return internal server error 500', async () => {
    const response = await request(app).put(updateRoute(route))
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });
});
