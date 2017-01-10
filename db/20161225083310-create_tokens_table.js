'use strict';
const TOKENS = 'tokens';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(TOKENS, {
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
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: { model: 'users', key: 'id' }
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(TOKENS);
  }
};
