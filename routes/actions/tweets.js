'use strict';
import Tweets from '../../models/tweets/tweets';
import Users from '../../models/users/users';
import APIException from '../exceptions';


/**
 * @description Retrieve tweets for given user's id. Select user's tweets and
 * also tweets of followed users. If user doesn' exist it throws APIException.
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let getTweets = function *(context) {
  let user = yield Users.findUserById(context.params.id);
  if (!user) {
    throw new APIException(404, 'Not found.');
  }

  let allUsers = [user._id].concat(user.follow);
  return Tweets.findTweetsByUserIds(allUsers);
};


/**
 * @description Insert new tweet for given user's id. If user doesn' exist it throws APIException.
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let insertTweet = function *(context) {
  context.checkBody('tweet').notEmpty('Missing required parametr: `tweet`');
  if (context.errors) {
    throw new APIException(400, context.errors);
  }

  let user = yield Users.findUserById(context.params.id);
  if (!user) {
    throw new APIException(404, 'Not found.');
  }

  return Tweets.insertTweet(user._id, context.request.body.tweet);
};


/**
 * @description Retrieve statistics about tweet count per user.
 *
 * @return {Object}
 */
let getStats = function *() {
  return Tweets.getStats();
};

export default {
  getTweets,
  insertTweet,
  getStats
};


