'use strict';
const env = process.env.NODE_ENV || 'development';

const config = {
  auth: {
    header: 'Session-Expires-In',
    timeout: 900
  },
  port: 3000,
  apiNamespace: '/api/v1'
};

module.exports = Object.assign({}, config, require(`./env/${env}`));
