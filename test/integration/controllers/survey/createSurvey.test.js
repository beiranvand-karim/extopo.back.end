/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../../app/index').listen();
const survey = require('./survey.meta');

let cookie;

beforeAll((done) => {
  request(app)
    .post('/sign-in')
    .send({
      'userName': 'beiranvand.karim@gmail.com',
      'passWord': 'karim'
    })
    .end((err, response) => {
      // save the token!
      if(response.headers['set-cookie'].length > 1) {
        cookie = response
          .headers['set-cookie']
          .map(item => item.split(';')[0])
          .join(';');
      }else{
        cookie = response
          .headers['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0])
          .join(';');
      }
      done();
    });
});

describe('POST /survey', () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post('/survey')
      .send(survey);
    expect(response.status).toEqual(401);
  });

  it('should create a survey 201', async () => {
    const response = await request(app).post('/survey')
      .send(survey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modifiedSurvey = { ...survey, workForceCount: 10 };
    const response = await request(app).post('/survey')
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });

  it('should return internal server error 500', async () => {
    const modifiedSurvey = { ...survey, workForceCount: 'karim',  projectType: 'frontend' };
    const response = await request(app).post('/survey')
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });
});
