'use strict';

let response = function (action) {

  return function *() {
    let result = false;

    try {
      result = yield action(this);

      if (!result) {
        return errorResponse(this, {message: 'Not Found.', status: 404});
      }

      return okResponse(this, result);

    }
    catch (err) {
      return errorResponse(this, err);
    }
  };
};

let okResponse = function (context, res) {
  context.status = context.method === 'POST' ? 201 : 200;
  context.body = res;
};

let errorResponse = function (context, error) {
  context.status = error.status || 400;
  context.body = error.message || error.errmsg || 'Bad Request';
};

export default response;