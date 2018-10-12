/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../');
const Membership = require('../models/membership');

describe('Membership ', () => {
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
