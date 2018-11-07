/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const resume = require('./resume.meta');
const { signIn } = require('../signInCallback');

let cookie;

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

describe('DELETE /resume', () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post('/resume')
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).del(`/resume/${_id}`);
    expect(response.status).toEqual(401);
  });

  it('should delete a resume 200', async () => {
    const response = await request(app).del(`/resume/${_id}`)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).del(`/resume/${_id}`)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
