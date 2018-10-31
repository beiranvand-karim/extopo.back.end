/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../../app/index').listen();

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
      .send({
        'workForceCount': 10,
        'demandedSkills': ['dba', 'graphist', 'frontend'],
        'projectType': 'frontend',
        'projectDescription': 'test project'
      });
    expect(response.status).toEqual(401);
  });

  it('should create a survey 201', async () => {
    const response = await request(app).post('/survey')
      .send({
        'workForceCount': 10,
        'demandedSkills': ['dba', 'graphist', 'frontend'],
        'projectType': 'frontend',
        'projectDescription': 'test project'
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const response = await request(app).post('/survey')
      .send({
        'workForceCount': '10',
        'demandedSkills': ['dba', 'graphist', 'frontend'],
        'projectType': 'frontend',
        'projectDescription': 'test project'
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
