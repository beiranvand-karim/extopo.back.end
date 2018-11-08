/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const review = require('./review.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = id => `/review/${id}`;

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

describe('DELETE ' + route(':id'), () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post('/review')
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).del(route(_id));
    expect(response.status).toEqual(401);
  });

  it('should delete a survey 200', async () => {
    const response = await request(app).del(route(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).del(route(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
