'use strict';
const env = process.env.NODE_ENV || 'development';

const config = {
  port: 3000,
  apiNamespace: ''
};

module.exports = Object.assign({}, config, require(`./env/${env}`));
