'use strict';
const USERS = 'users'; 

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;'
    ).then(function () {
      return queryInterface.changeColumn(USERS, 'email', {
        type: 'citext',
        allowNull: false
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(USERS, 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
