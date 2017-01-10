'use strict';
const moment = require('moment');
const uuid = require('uuid');

const { auth: { timeout } = {} } = require('../../config');

module.exports = function (sequelize, DataTypes) {
  const Token = sequelize.define('Token', {
    access_token: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    expires_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    underscored: true,
    tableName: 'tokens',
    scopes: {},
    classMethods: {
      associate: function (models) {
        Token.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      }
    },
    instanceMethods: {
      resetExpirationDate() {
        this.set({
          expires_at: moment().add(timeout, 'seconds')
        });
      },

      generate() {
        this.set({
          access_token: uuid.v4(),
        });
        this.resetExpirationDate();
      }
    }
  });
  return Token;
};
