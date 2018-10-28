/* global describe, it */
'use strict';

const supertest = require('supertest');
const app = require('../../../../app/index');
const User = require('../../../../app/models/user');

describe.skip('signOut', () => {
  const request = supertest(app.listen());

  describe('GET /sign-out', async () => {
    it('should say that user is already signed out', async () => {
      await request
        .get('/sign-out')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(200)
        .expect('user is already signed out.');
    });

    it('should say that user signed out.', async () => {
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

      await request
        .post('/sign-in')
        .send({
          'userName': 'beiranvand.karim@gmail.com',
          'passWord': 'karim'
        })
        .set('Content-Type', 'application/json');

      await request
        .get('/sign-out')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(200)
        .expect('user successfully signed out.');
    });
  });
});
