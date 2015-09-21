'use strict';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import coMocha from 'co-mocha';
import proxy from 'proxyquire';
import APIException from '../routes/exceptions';
import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon-es6';

chai.use(spies);

let usersMock = {};
let tweetsMock = {};

let tweetsActions = proxy('../routes/actions/tweets', {
  '../../models/users/users': usersMock,
  '../../models/tweets/tweets': tweetsMock
});

describe('tweetsActions:', () => {
  it('should return all tweets', function *() {
    let id = 'Martin';
    let context = {
      params: {
        id
      }
    };

    tweetsMock.findTweetsByUserIds = function (usersIds) {
      return [];
    };

    usersMock.findUserById = function *(id) {
      return {
        _id: id,
        follow: []
      };
    };

    let tweets = yield tweetsActions.getTweets(context);
    expect(tweets).to.eql([]);
  });

  it('should throw exception when user is not found', function *() {
    let id = 'Martin';
    let context = {
      params: {
        id
      }
    };

    usersMock.findUserById = function *() {
      return null;
    };

    let exception;
    try {
      yield tweetsActions.getTweets(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });
  it('should insert new tweet', function *() {
    let id = 'Martin';
    let message = 'Tweet tweet';
    let context = {
      params: {
        id
      },
      request: {
        body: {
          tweet: message
        }
      },
      errors: false,
      checkBody() {
        return this;
      },
      notEmpty() {
        return this;
      }
    };

    tweetsMock.insertTweet = function (id, tweet) {
      return {id, tweet};
    };

    usersMock.findUserById = function *(id) {
      return {
        _id: id
      };
    };

    let tweet = yield tweetsActions.insertTweet(context);
    expect(tweet).to.eql({id: id, tweet: message});

  });

  it('should throw exception when user is not found when inserting new tweet', function *() {
    let id = 'Martin';
    let message = 'Tweet tweet';
    let context = {
      params: {
        id
      },
      request: {
        body: {
          tweet: message
        }
      },
      errors: ['Missing required parametr: `tweet`'],
      checkBody() {
        return this;
      },
      notEmpty() {
        return this;
      }
    };

    usersMock.findUserById = function *() {
      return null;
    };

    let exception;
    try {
      yield tweetsActions.insertTweet(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });

  it('should call getStats', function *() {
    tweetsActions.getStats = function *() {
      return [];
    };

    let stats = yield tweetsActions.getStats();
    expect(stats).to.eql([]);
  });
});



