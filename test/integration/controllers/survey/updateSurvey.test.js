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
  it.skip('should return bad request 400', async () => {
    const modifiedSurvey = Object.assign({}, survey, { workForceCount: '10',  projectType: 'test' });
    const response = await request(app).put(`/survey/${_id}`)
      .send(modifiedSurvey)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
