/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
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

describe('PUT /survey', () => {
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
    const response = await request(app).put(`/survey/${_id}`)
      .send(survey);
    expect(response.status).toEqual(401);
  });

  it('should update a survey 200', async () => {
    const modifiedSurvey = { ...survey, workForceCount: 'two or more', projectType: 'back end' };
    const response = await request(app).put(`/survey/${_id}`)
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
  // todo fix this
  it('should return bad request 400', async () => {
    const response = await request(app).put(`/survey/${_id}`)
      .send({
        'workForceCount': '10',
        'demandedSkills': 'dba',
        'projectType': 'frontend',
        'projectDescription': 'test project'
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
