/* global describe, it, expect, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const { signIn } = require('../signInCallback');

let cookie;
const route = 'province';
const idRoute = id => `/${route}/${id}`;

const _id = 0;

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

describe('GET ' + idRoute(':id'), () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).get(idRoute(_id));
    expect(response.status).toEqual(401);
  });

  it(`should read a ${route} 200`, async () => {
    const response = await request(app).get(idRoute(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    const _id = 50;
    const response = await request(app).get(idRoute(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
