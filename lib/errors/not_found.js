'use strict';

class NotFound extends Error {
  constructor(resource, key) {
    super();
    this.message = `${resource.Model.name} with ${key} = ${resource[key]} not found.`
  }
}

module.exports = NotFound;
