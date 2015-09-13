'use strict';

import mongoose from 'mongoose';

let tweetSchema = mongoose.Schema({
  tweet: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

tweetSchema.statics.getStats = function () {
  return this.aggregate([
    {$group: {_id: `$user_id`, count: {$sum: 1}}}
  ]).exec();
};

let Tweet = mongoose.model('tweet', tweetSchema);


let getStats = function () {
  return Tweet.getStats();
};

let findByUserId = function (userId) {
  return Tweet.find({user_id: userId});
};

let findByUserIds = function (userIds) {
  return Tweet.find({user_id: {$in: userIds}})
    .sort({timestamp: -1})
    .populate('user_id', `name -_id`)
    .select(`tweet user_id timestamp -_id`);
};

let insert = function (userId, text) {
  let tweet = new Tweet({user_id: userId, tweet: text});
  return tweet.save();
};

export default {
  findByUserId,
  findByUserIds,
  insert,
  getStats
};
