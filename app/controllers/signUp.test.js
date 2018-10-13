/* global describe, beforeEach, it, expect */
'use strict';

const supertest = require('supertest');
const app = require('../');
const User = require('../models/user');

describe('signUp', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {

  });

  describe('POST /sign-up', async () => {
    it('should create a user', async () => {
      await User.remove({});

      const res = await request
        .post('/sign-up')
        .send({
          'firstName': 'kairm',
          'lastName': 'beiranvand',
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim',
          'userType': 'employer'
        })
        .set('Content-Type', 'application/json');

      const { saveUser } = res.body;

      const expected = ['_id', 'firstName', 'lastName', 'userName', 'passWord', 'userType', 'registrationDate', 'lastLogIn'];

      expect(Object.keys(saveUser)).toEqual(expect.arrayContaining(expected));
    });

    it('should say that user already in use', async () => {
      await User.remove({});

      const res = await request
        .post('/sign-up')
        .send({
          'firstName': 'kairm',
          'lastName': 'beiranvand',
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim',
          'userType': 'employer'
        })
        .set('Content-Type', 'application/json');

      const { saveUser } = res.body;

      const expected = ['_id', 'firstName', 'lastName', 'userName', 'passWord', 'userType', 'registrationDate', 'lastLogIn'];

      expect(Object.keys(saveUser)).toEqual(expect.arrayContaining(expected));

      const response = await request
        .post('/sign-up')
        .send({
          'firstName': 'kairm',
          'lastName': 'beiranvand',
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim',
          'userType': 'employer'
        })
        .set('Content-Type', 'application/json');

      const { text, status } = response;

      expect(status).toBe(409);
      expect(text).toBe('user already in use.');
    });
  });
});
