/* global describe, expect, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../../index');
const User = require('../../models/user');

describe('signIn', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {

  });

  describe('POST /sign-in', async () => {
    it('should encounter an internal server error', async () => {
      await User.deleteMany({});

      const res = await request
        .post('/sign-up')
        .send({
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim'
        })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(500);
    });

    it('should sign in', async () => {
      await User.deleteMany({});

      await request
        .post('/sign-up')
        .send({
          'firstName': 'kairm',
          'lastName': 'beiranvand',
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim',
          'userType': 'employer'
        })
        .set('Content-Type', 'application/json');

      const response = await request
        .post('/sign-in')
        .send({
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim'
        })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
    });
  });
});
