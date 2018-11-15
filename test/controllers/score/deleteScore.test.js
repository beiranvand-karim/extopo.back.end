/* global describe, it, expect, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const score = require('./score.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = 'score';
const idRoute = id => `/${route}/${id}`;
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

describe('DELETE ' + idRoute(':id'), () => {
  let _id;

  beforeAll(async (done) => {
    const response = await request(app).post(createRoute)
      .send(score)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    _id = response.body._id;
    done();
  });

  it('should return not authenticated 401', async () => {
    const response = await request(app).del(idRoute(_id));
    expect(response.status).toEqual(401);
  });

  it(`should delete a ${route} 200`, async () => {
    const response = await request(app).del(idRoute(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
  });

  it('should return internal server error 500', async () => {
    const response = await request(app).del(idRoute('some_text'))
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });

  it('should return not found 404', async () => {
    _id = Array.from(_id)
      .reverse()
      .join('');
    const response = await request(app).del(idRoute(_id))
      .set('Cookie', cookie);
    expect(response.status).toEqual(404);
  });
});
