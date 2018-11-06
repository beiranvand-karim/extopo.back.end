/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../../app/index');
const Experience = require('../../../app/models/experience');

describe.skip('Experience ', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await Experience.deleteMany({});
  });

  describe('GET /experience', () => {
    it('should be unauthorized.', async () => {
      const res = await request
        .get('/experience')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401);
    });
  });
});
