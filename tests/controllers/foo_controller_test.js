'use strict';
const FooController = require('../../app/controllers/foo_controller');
const BaseController = require('../../app/controllers/base_controller');

describe('app/controllers/foo_controller', function () {
  it('should extend BaseController', function () {
    expect(new FooController()).toBeA(BaseController);
  });
});
