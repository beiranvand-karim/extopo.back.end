/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const membership = require('./membership.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'membership';
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

describe('POST ' + createRoute, () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post(createRoute)
      .send(membership);
    expect(response.status).toEqual(401);
  });

  it(`should create a ${route} 201`, async () => {
    const response = await request(app).post(createRoute)
      .send(membership)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modified = { ...membership, userType: 10 };
    const response = await request(app).post(createRoute)
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
