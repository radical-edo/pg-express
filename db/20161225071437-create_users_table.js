'use strict';
const USERS = 'users';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(USERS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      encrypted_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(USERS);
  }
};
