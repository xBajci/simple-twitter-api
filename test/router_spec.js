'use strict';
import {describe, it} from 'mocha';
import coMocha from 'co-mocha';
import koa from 'koa';
import proxy from 'proxyquire';
import request from 'supertest';

let app = koa();

let userActionsMock = {
    getUsers: function *() {
      return 'Martin';
    },
    getUserById: function *() {
      return 'Lucka';
    },
    createNewUser: function *() {
      return 'Petr';
    },
    removeUser: function *() {
      return 'Sarka';
    },
    followUser: function *() {
      return 'Eva';
    }
  },
  tweetActionsMock = {
    getTweets: function *() {
      return 'Kuba';
    },
    insertTweet: function *() {
      return 'Hynek';
    },
    getStats: function *() {
      return 'Jaromir';
    }
  };

let routes = proxy.noCallThru()('../routes/routes', {
  './actions/users': userActionsMock,
  './actions/tweets': tweetActionsMock
});

app.use(routes.getRoutes());

let server = app.listen();

describe('Users routes:', () => {

  it('GET /users', function*(done) {
    request(server)
      .get('/users')
      .expect({data: yield userActionsMock.getUsers()})
      .expect(200, done);
  });

  it('GET /users/:id', function*(done) {
    request(server)
      .get('/users/Lucie')
      .expect({data: yield userActionsMock.getUserById()})
      .expect(200, done);
  });

  it('POST /users', function*(done) {
    request(server)
      .post('/users')
      .expect({data: yield userActionsMock.createNewUser()})
      .expect(201, done);
  });

  it('DELETE /users/:id', function*(done) {
    request(server)
      .delete('/users/:id')
      .expect({data: yield userActionsMock.removeUser()})
      .expect(200, done);
  });

  it('POST /users/:id/follow/:otherId', function*(done) {
    request(server)
      .post('/users/Lucie/follow/Martin')
      .expect({data: yield userActionsMock.followUser()})
      .expect(201, done);
  });
});

describe('Tweets routes:', () => {
  it('GET /users/:id/tweets', function*(done) {
    request(server)
      .get('/users/Kuba/tweets')
      .expect({data: yield tweetActionsMock.getTweets()})
      .expect(200, done);
  });

  it('POST /users/:id/tweets', function*(done) {
    request(server)
      .post('/users/Hynek/tweets')
      .expect({data: yield tweetActionsMock.insertTweet()})
      .expect(201, done);
  });

  it('GET /stats', function*(done) {
    request(server)
      .get('/stats')
      .expect({data: yield tweetActionsMock.getStats()})
      .expect(200, done);
  });
});