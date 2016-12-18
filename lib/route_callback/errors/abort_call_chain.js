'use strict';

class AbortCallChain extends Error {
  constructor(action) {
    super();
    this.message = `Aborting action chain early. Action name=${action}`;
  }
}

module.exports = AbortCallChain;
