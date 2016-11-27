'use strict';
const BadRequest = require('../../../lib/errors/bad_request');

describe('lib/errors/bad_request', function () {
  it('should extend Error', function () {
    expect(new BadRequest()).toBeA(Error);
  });
});
