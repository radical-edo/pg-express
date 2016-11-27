'use strict';

class BadRequest extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = BadRequest;
