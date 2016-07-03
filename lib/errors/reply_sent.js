'use strict';

class ReplySent extends Error {
  constructor(controllerName, action) {
    super();
    this.name = 'ReplySent';
    this.message = `Reply for ${controllerName}#${action} has already been sent`;
  }
}

module.exports = ReplySent;
