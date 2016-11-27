'use strict';
const BaseController = require('./base_controller');
const { ReplySent } = require('../../lib/errors');

class FooController extends BaseController {
  constructor(...args) {
    super(...args);
    this.before('breakEarlyWithTrueReturned', { only: 'show' });
    this.before('breakEarlyWithError', { except: 'show' });
  }

  breakEarlyWithTrueReturned() {
    this.reply('call chain has been broken. "show" will never be called');
    return true;
  }

  breakEarlyWithError() {
    this.reply('call chain has been broken. "index" will never be called');
    throw new ReplySent();
  }

  index() {
    this.reply('index');
  }

  show() {
    this.reply('show');
  }
}

module.exports = FooController;
