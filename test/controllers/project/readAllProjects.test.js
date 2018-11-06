/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../../app/index');
const Project = require('../../../app/models/project');

describe('Membership ', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await Project.deleteMany({});
  });

  describe('GET /project', () => {
    it('should be unauthorized.', async () => {
      const res = await request
        .get('/project')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401);
    });
  });
});
