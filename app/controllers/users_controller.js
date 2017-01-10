'use strict';
const { Renderer } = require('jabl');
const BPromise = require('bluebird');

const { NotFound } = require('../../lib/errors');
const helpers = require('../helpers');
const { userParams } = require('./validators');
const BaseController = require('./base_controller');
const { Sequelize, User } = require('../models');

class UsersController extends BaseController {
  constructor(...args) {
    super(...args);
    this.before('__findUser', { only: ['destroy', 'update', 'show'] });
    this.before('__validateUserParams', { only: ['create', 'update'] });
  }

  __findUser() {
    const { params: { id } = {} } = this.req;
    return User.findOne({ where: { id } }).then((user) => {
      if (null != user) {
        this.__user = user;
      } else {
        throw new NotFound(User.build({ id }), 'id');
      }
    });
  }

  __validateUserParams() {
    const { body } = this.req;
    return userParams.validate(body).then((errors) => {
      const hasErrors = null != errors;
      if (true === hasErrors) {
        this.reply({ errors }, 400);
      }
      return hasErrors;
    });
  }

  destroy() {
    return this.__user.destroy().then(() => {
      return this.reply('', 204);
    });
  }

  update() {
    const {
      body: { email, password, last_name, first_name } = {}
    } = this.req;
    return BPromise.resolve(null != password).then(function (changePassword) {
      if (true === changePassword) {
        return User.hashPassword(password);
      } else {
        return null;
      }
    }).then((encrypted_password) => {
      this.__user.set({ email, last_name, first_name });
      if (null != encrypted_password) {
        this.__user.set({ encrypted_password });
      }
      return this.__user.save();
    }).then(function (updatedUser) {
      return new Renderer('users/update', updatedUser).render();
    }).then((data) => {
      return this.reply({ data });
    }).catch(Sequelize.ValidationError, (err) => {
      const errors = helpers.mapSequelizeValidationErrors(err);
      return this.reply({ errors }, 422);
    });
  }

  show() {
    return new Renderer('users/show', this.__user).render().then((data) => {
      return this.reply({ data });
    });
  }

  create() {
    const {
      body: {
        email, password, last_name, first_name
      } = {}
    } = this.req;
    return User.hashPassword(password).then(function (encrypted_password) {
      const user = User.build({
        email, encrypted_password, last_name, first_name
      });
      return user.save();
    }).then(function (user) {
      return new Renderer('users/create', user).render();
    }).then((data) => {
      return this.reply({ data });
    }).catch(Sequelize.ValidationError, (err) => {
      const errors = helpers.mapSequelizeValidationErrors(err);
      return this.reply({ errors }, 422);
    });
  }

  index() {
    return User.findAll({ order: [['created_at', 'ASC' ]] }).then(function serializeUsers(users) {
      return new Renderer('users/index', users).render();
    }).then((data) => {
      return this.reply({ data });
    });
  }
}

module.exports = UsersController;
