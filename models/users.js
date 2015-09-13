'use strict';
import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  follow: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

let Users = mongoose.model('user', userSchema);

let findAll = function () {
  return Users.find().select('id follow -_id').populate('follow', 'name');
};

let findById = function (id) {
  return Users.findOne({id: id});
};

let insert = function (id) {
  let user = new Users({id: id});
  return user.save();
};

let remove = function (userId) {
  return Users.remove({id: userId});
};

let follow = function (user, otherUser) {
  return user.update({$addToSet: {follow: otherUser['id']}}, {new: true});
};

export default {
  findAll,
  findById,
  insert,
  remove,
  follow
};



