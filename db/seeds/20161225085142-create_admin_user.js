'use strict';
const { User } = require('../../app/models');

const { env: { ADMIN_USER_EMAIL: email } = {} } = process;
const { env: { ADMIN_USER_PASSWORD: password } = {} } = process;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return User.hashPassword(password).then(function (encrypted_password) {
      return User.findOrCreate({
        where: { email },
        defaults: { encrypted_password }
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return User.destroy({ where: { email } });
  }
};
