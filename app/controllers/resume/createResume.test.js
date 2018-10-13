/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../index');
const Resume = require('../../models/resume');

describe('Membership ', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await Resume.deleteMany({});
  });

  describe('GET /resume', () => {
    it('should be unauthorized.', async () => {
      const res = await request
        .get('/resume')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401);
    });
  });
});
