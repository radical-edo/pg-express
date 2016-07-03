'use strict';
const BaseController = require('./base_controller');

class FooController extends BaseController {
  constructor(...args) {
    super(...args);
    this.before('checkStuff');
  }

  checkStuff() {
    return true;
  }

  index() {
    this.reply('index');
  }
}

module.exports = FooController;
