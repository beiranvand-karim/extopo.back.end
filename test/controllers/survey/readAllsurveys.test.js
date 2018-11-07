/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const Survey = require('../../../app/models/survey');
const survey = require('./survey.meta');
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

describe('GET /survey', () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post('/survey')
      .send(survey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).get('/survey');
    expect(response.status).toEqual(401);
  });

  it('should read a survey 200', async () => {
    const response = await request(app).get('/survey')
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return not found 404', async () => {
    await Survey.deleteMany({});
    const response = await request(app).get('/survey')
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
