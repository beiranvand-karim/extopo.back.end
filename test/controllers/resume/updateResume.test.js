/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const resume = require('./resume.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = id => `/resume/${id}`;
const createRoute = '/resume';

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

describe('PUT ' + route(':id'), () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post(createRoute)
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).put(route(_id))
      .send(resume);
    expect(response.status).toEqual(401);
  });

  it('should update a review 200', async () => {
    const modified = { ...resume, point: 20 };
    const response = await request(app).put(route(_id))
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });
  it('should return bad request 400', async () => {
    const response = await request(app).put(route(_id))
      .send({
        'coverLetter': 10
      })
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).put(route(_id))
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
  it('should return internal server error 500', async () => {
    const response = await request(app).put(route('some_text'))
      .send(resume)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });
});
