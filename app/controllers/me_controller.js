'use strict';
const { omit } = require('lodash');

const BaseController = require('./base_controller');

class MeController extends BaseController {
  index() {
    const data = this.req.currentUser.toJSON();
    data.token = omit(this.req.token.toJSON(), 'user')
    this.reply({ data });
    return null;
  }
}

module.exports = MeController;
