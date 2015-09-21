'use strict';
import Tweets from './index';

export default {

  /**
   * @param {Array} userIds
   *
   * @return {Query}
   */
  findTweetsByUserIds(userIds) {
    return Tweets.find({user_id: {$in: userIds}}).sort('-timestamp').exec();
  },

  /**
   * @param {string} userId
   * @param {string} tweet
   *
   * @return {Promise}
   */
  insertTweet(userId, tweet) {
    let newTweet = new Tweets({tweet: tweet, user_id: userId});
    return newTweet.save();
  },

  /**
   * @return {Promise}
   */
  getStats() {
    return Tweets.getStats();
  }
};

