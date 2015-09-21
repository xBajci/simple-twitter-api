'use strict';

/**
 * @description Wrapper around action method that catch eventual exceptions and create
 * response.
 *
 * @param action
 * @returns {*}
 */
let response = function (action) {

  return function *(next) {
    let result = false;

    try {
      result = yield action(this);
      okResponse(this, result);
    }
    catch (e) {
      errorResponse(this, e);
    }

    return next;
  };
};


/**
 * @description Set success response with data property.
 *
 * @param context
 * @param {*} data
 */
let okResponse = function (context, data) {
  context.status = context.method === 'POST' ? 201 : 200;
  context.body = {
    data: data
  };
};


/**
 * @description Set error response with status and data properties.
 *
 * @param context
 * @param {Error|APIException}
 */
let errorResponse = function (context, exception) {
  context.status = exception.status || 400;
  context.body = {
    status: context.status,
    data: exception.message || 'Bad Request'
  };
};


export default response;
