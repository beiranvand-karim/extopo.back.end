/* global describe, it, expect, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const score = require('./score.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'score';
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
      .send(score)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).put(updateRoute(_id))
      .send(score);
    expect(response.status).toEqual(401);
  });

  it(`should update a(n) ${route} 200`, async () => {
    const modified = { ...score, point: 20 };
    const response = await request(app).put(updateRoute(_id))
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
  it('should return bad request 400', async () => {
    const response = await request(app).put(updateRoute(_id))
      .send({
        'fastness': '10'
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).put(updateRoute(_id))
      .send(score)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
  it('should return internal server error 500', async () => {
    const response = await request(app).put(updateRoute(route))
      .send(score)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });
});
