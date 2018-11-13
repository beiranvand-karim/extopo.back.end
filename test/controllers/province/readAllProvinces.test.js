/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const { signIn } = require('../signInCallback');

let cookie;
const route = 'province';
const readRoute = `/${route}`;

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
  it('should return not authenticated 401', async () => {
    const response = await request(app).get(readRoute);
    expect(response.status).toEqual(401);
  });

  it(`should read ${route}(s) 200`, async () => {
    const response = await request(app).get(readRoute)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
});
