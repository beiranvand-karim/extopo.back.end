/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../../app/index').listen();

let cookie;

const resume = {
  'skills': [
    'angular',
    'react',
    'java spring',
    'node.js',
    'python'
  ],
  'experiences': [
    '5bbc5b57fc16fb380794ced0'
  ],
  'languages': [
    'english',
    'persian'
  ],
  'projects': [
    '5bbdadecd06ff54df19fdc7c'
  ],
  'coverLetter': 'this is a cover letter'
};

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

describe('POST /resume', () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post('/resume')
      .send(resume);
    expect(response.status).toEqual(401);
  });

  it('should create a resume 201', async () => {
    const response = await request(app).post('/resume')
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modifiedResume = Object.assign({}, resume, { coverLetter: 20 });
    const response = await request(app).post('/resume')
      .send(modifiedResume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
