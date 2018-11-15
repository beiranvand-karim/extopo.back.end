/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const survey = require('./survey.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'survey';
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

describe('POST /survey', () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post(createRoute)
      .send(survey);
    expect(response.status).toEqual(401);
  });

  it(`should create a ${route} 201`, async () => {
    const response = await request(app).post(createRoute)
      .send(survey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modifiedSurvey = { ...survey, workForceCount: 10 };
    const response = await request(app).post(createRoute)
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });

  it('should return internal server error 500', async () => {
    const modifiedSurvey = { ...survey, workForceCount: 'karim',  projectType: 'frontend' };
    const response = await request(app).post(createRoute)
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });
});
