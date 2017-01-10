'use strict';

class Unauthorized extends Error {
  constructor(options = {}) {
    super();
    const { info = 'Invalid credentials', field = [], received = [] } = options;
    this.name = 'Unauthorized';
    this.errors = [{
      field: field.join('/'),
      info,
      received: received.join('/')
    }];
  }
}

module.exports = Unauthorized;
