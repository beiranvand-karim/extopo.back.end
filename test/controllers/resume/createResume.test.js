/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const resume = require('./resume.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'resume';
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

describe('POST /resume', () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post(createRoute)
      .send(resume);
    expect(response.status).toEqual(401);
  });

  it(`should create a ${route} 201`, async () => {
    const response = await request(app).post(createRoute)
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modifiedResume = Object.assign({}, resume, { coverLetter: 20 });
    const response = await request(app).post(createRoute)
      .send(modifiedResume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
