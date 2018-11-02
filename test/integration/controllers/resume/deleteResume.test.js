/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../../app/index').listen();
const resume = require('./resume.meta');
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
