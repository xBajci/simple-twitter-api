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

export default mongoose.model('tweet', tweetSchema);