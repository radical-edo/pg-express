'use strict';
const BaseController = require('./base_controller');
const { ReplySent } = require('../../lib/errors');

class FooController extends BaseController {
  constructor(...args) {
    super(...args);
    this.before('checkStuff', { except: 'show' });
  }

  checkStuff() {
    this.reply('break early');
    throw new Error();
  }

  index() {
    this.reply('index');
  }

  show() {
    this.reply('show');
  }
}

module.exports = FooController;
