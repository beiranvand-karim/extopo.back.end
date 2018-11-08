/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../../app/index');
const Membership = require('../../../app/models/membership');

describe.skip('Membership ', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await Membership.deleteMany({});
  });

  describe('GET /membership', () => {
    it('should be unauthorized.', async () => {
      const res = await request
        .get('/membership')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401);
    });
  });
});
