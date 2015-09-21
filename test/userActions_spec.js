'use strict';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import coMocha from 'co-mocha';
import proxy from 'proxyquire';
import APIException from '../routes/exceptions';

let usersMock = {};

let userActions = proxy('../routes/actions/users', {
  '../../models/users/users': usersMock
});

describe('userActions:', () => {
  it('should return all users', function *() {
    usersMock.findAllUsers = function () {
      return [];
    };

    let allUsers = yield userActions.getUsers();
    expect(allUsers).to.eql([]);
  });

  it('should find user with id', function *() {
    let id = 'Martin';
    let context = {
      params: {
        id
      }
    };

    usersMock.findUserById = function *(id) {
      return {id};
    };

    let allUsers = yield userActions.getUserById(context);
    expect(allUsers).to.eql({id});
  });

  it('should throw exception when user is not found', function *() {
    let context = {
      params: {
        id: null
      }
    };

    usersMock.findUserById = function *() {
      return null;
    };

    let exception;
    try {
      yield userActions.getUserById(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });

  it('should create new user', function*() {
    let id = 'Martin';
    let context = {
      request: {
        body: {
          id
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

    usersMock.insertUser = function (id) {
      return {id};
    };

    let newUser = yield userActions.createNewUser(context);
    expect(newUser).to.eql({id});
  });

  it('should throw exception when required parameter `id` is missing when creating new user', function *() {
    let context = {
      request: {
        body: {}
      },
      errors: ['Missing required parametr: `id`'],
      checkBody() {
        return this;
      },
      notEmpty() {
        return this;
      }
    };

    let exception;
    try {
      yield userActions.createNewUser(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });

  it('should remove user', function *() {
    let id = 'Martin';
    let context = {
      params: {
        id
      }
    };

    usersMock.removeUser = function (id) {
      return {
        result: {
          ok: 1,
          n: 1
        }
      };
    };

    let response = yield userActions.removeUser(context);
    expect(response).to.eql('Removed: ' + id);
  });

  it('should follow other user', function *() {
    let id = 'Martin';
    let otherId = 'Lucie';
    let context = {
      params: {
        id,
        otherId
      }
    };

    usersMock.findUserById = function*(id) {
      if (!id) {
        return null;
      }
      return {id, _id: id};
    };

    usersMock.followUser = function (id, otherId) {
      return {id, otherId};
    };

    let response = yield userActions.followUser(context);
    expect(response).to.eql({id, otherId});
  });

  it('should throw exception when first user is not found', function *() {
    let id = null;
    let otherId = 'Lucie';
    let context = {
      params: {
        id,
        otherId
      }
    };

    usersMock.findUserById = function*(id) {
      if (!id) {
        return null;
      }
      return {id, _id: id};
    };

    let exception;
    try {
      yield userActions.followUser(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });

  it('should throw exception when other user is not found', function *() {
    let id = 'Martin';
    let otherId = null;
    let context = {
      params: {
        id,
        otherId
      }
    };

    usersMock.findUserById = function*(id) {
      if (!id) {
        return null;
      }
      return {id, _id: id};
    };

    let exception;
    try {
      yield userActions.followUser(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
  });

  it('should throw exception when trying to follow yourself', function *() {
    let id = 'Martin';
    let otherId = id;
    let context = {
      params: {
        id,
        otherId
      }
    };

    usersMock.findUserById = function*(id) {
      if (!id) {
        return null;
      }
      return {id, _id: id};
    };

    let exception;
    try {
      yield userActions.followUser(context);
    }
    catch (e) {
      exception = e;
    }

    expect(exception).to.be.an.instanceof(APIException);
    expect(exception.message).to.eql('Can\'t follow yourself.');
  });
});



