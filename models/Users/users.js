'use strict';
import Users from './index';


/**
 * @return {Promise}
 */
let findAllUsers = function () {
  return Users.find().select('id follow -_id').populate('follow', 'name').exec();
};


/**
 * @param {string} id
 *
 * @return {Promise}
 */
let findUserById = function (id) {
  return Users.findOne({id}).exec();
};


/**
 * @param {string} id
 *
 * @return {Promise}
 */
let insertUser = function (id) {
  let user = new Users({id});
  return user.save();
};


/**
 * @param {string} id
 *
 * @return {Promise}
 */
let removeUser = function (id) {
  return Users.remove({id}).exec();
};


/**
 * @param {string} id
 * @param {ObjectID} otherId
 *
 * @return {Object}
 */
let followUser = function (id, otherId) {
  return Users.findOneAndUpdate(
    {id: id},
    {$addToSet: {follow: otherId}},
    {new: true}
  ).exec();
};


export default {
  findAllUsers,
  findUserById,
  insertUser,
  removeUser,
  followUser
}



