'use strict';
const bcrypt = require('bcrypt');

const BPromise = require('bluebird');

const genSaltAsync = BPromise.promisify(bcrypt.genSalt);
const hashAsync = BPromise.promisify(bcrypt.hash);
const compareAsync = BPromise.promisify(bcrypt.compare);

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: 'citext',
      unique: true
    },
    encrypted_password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'users',
    scopes: {},
    classMethods: {
      hashPassword(password) {
        return genSaltAsync(10).then(function (salt) {
          return bcrypt.hash(password, salt);
        });
      },

      associate: function (models) {
        User.hasOne(models.Token, { foreignKey: 'user_id' });
      }
    },
    instanceMethods: {
      validatePassword(password) {
        return compareAsync(password, this.encrypted_password);
      }
    }
  });
  return User;
};
