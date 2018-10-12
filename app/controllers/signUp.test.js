/* global describe, beforeEach, it */
'use strict';

const supertest = require('supertest');
const app = require('../');
const User = require('../models/user');

describe('signUp', () => {
  const request = supertest(app.listen());

  beforeEach(async () => {
    await User.remove({});
  });

  describe('POST /sign-up', () => {
    it('should create a user.', async () => {
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
  });
});
