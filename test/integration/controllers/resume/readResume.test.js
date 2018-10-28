/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../../../app/index');
const Resume = require('../../../../app/models/resume');

describe.skip('Membership ', () => {
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
