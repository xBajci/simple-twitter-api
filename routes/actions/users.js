'use strict';
import Users from '../../models/users/users';
import APIException from '../exceptions';

/**
 * @description Retrieve list of users.
 *
 * @return {Object}
 */
let getUsers = function *() {
  return Users.findAllUsers();
};


/**
 * @description Retrieve uses info by user id. If user doesn' exist it throws APIException.
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let getUserById = function *(context) {
  let user = yield Users.findUserById(context.params.id);
  if (!user) {
    throw new APIException(404, 'Not found.');
  }

  return user;
};


/**
 * @description Create new user. It requeres id property i request body, otherwise it throws APIException.
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let createNewUser = function *(context) {
  context.checkBody('id').notEmpty('Missing required parametr: `id`');
  if (context.errors) {
    throw new APIException(400, context.errors);
  }

  return Users.insertUser(context.request.body.id);
};


/**
 * @description Remove user by user id. If user doesn' exist, it throws APIException.
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let removeUser = function *(context) {
  let removed = yield Users.removeUser(context.params.id);
  if(removed.result.ok && removed.result.n) {
    return 'Removed: ' + context.params.id;
  }

  throw new APIException(404, 'Not found');
};


/**
 * @description Add user to follow list of another user. Both users must exist,
 * otherwise it throws APIException
 *
 * @param {Object} context
 *
 * @return {Object}
 * @throws APIException
 */
let followUser = function *(context) {
  let id = context.params.id;
  let otherId = context.params.otherId;

  if (id === otherId) {
    throw new APIException(400, 'Can\'t follow yourself.');
  }

  let user = yield Users.findUserById(id);
  if (!user) {
    throw new APIException(400, 'Not found.');
  }

  let otherUser = yield Users.findUserById(otherId);
  if (!otherUser) {
    throw new APIException(400, 'Not found.');
  }

  return Users.followUser(id, otherUser._id);
};


export default {
  getUsers,
  getUserById,
  createNewUser,
  removeUser,
  followUser
};
