'use strict';
const BPromise = require('bluebird');
const lodash = require('lodash');
const { Renderer } = require('jabl');

const { auth: { header, timeout } = {} } = require('../../config');
const BaseController = require('./base_controller');
const { User, Token } = require('../models');
const { Unauthorized } = require('../../lib/errors');

class AuthController extends BaseController {
  create() {
    const {
      body: { email = '', password = '' }
    } = this.req;
    return User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return BPromise.all([user, user.validatePassword(password)]);
      } else {
        throw new Unauthorized({
          field: ['email', 'password'],
          received: [email, password]
        });
      }
    }).spread((user, passwordIsValid) => {
      if (true === passwordIsValid) {
        return BPromise.all([user, Token.findOne({ where: { user_id: user.id } })]);
      } else {
        throw new Unauthorized({
          field: ['email', 'password'],
          received: [email, password]
        });
      }
    }).spread(function (user, token) {
      if (!token) {
        token = Token.build({ user_id: user.id });
      }
      token.generate();
      return BPromise.all([user, token.save()]);
    }).spread((user, token) => {
      this.res.set(header, timeout);
      user.token = token;
      return new Renderer('auth/create', user).render();
    }).then((data) => {
      this.reply({ data });
      return null;
    }).catch(Unauthorized, (err) => {
      const { errors } = err;
      this.reply({ errors }, 401);
    });
  }

  destroy() {
    return this.req.token.destroy().then(() => {
      this.reply('', 204);
    });
  }
}

module.exports = AuthController;
