'use strict';

class NotFound extends Error {
  constructor(resource, key) {
    super();
    this.message = `${resource.constructor.name} with ${key} = ${resource[key]} not found.`
  }
}

module.exports = NotFound;
