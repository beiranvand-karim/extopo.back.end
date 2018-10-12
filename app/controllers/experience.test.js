/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../');
const Experience = require('../models/experience');

describe('Experience ', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await Experience.remove({});
  });

  describe('GET /experience', () => {
    it('', async () => {
      const res = await request
        .get('/experience')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(200);

      console.log(res.body);
    });
  });
});
