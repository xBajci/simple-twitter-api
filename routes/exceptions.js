'use strict';

/**
 *
 * @param status
 * @param message
 * @returns {APIException}
 * @constructor
 */
let APIException = function (status, message) {
  if (!(this instanceof APIException)) {
    return new APIException(status, message);
  }

  this.name = APIException.name;
  this.status = status;
  this.message = message;
};

/**
 *
 * @type {Error}
 */
APIException.prototype = new Error();

/**
 *
 * @returns {string}
 */
APIException.prototype.toString = function () {
  return `${this.name}: ${this.message}`;
};

export default APIException;