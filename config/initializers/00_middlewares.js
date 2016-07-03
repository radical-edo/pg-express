'use strict';
const strap = require('node-strap');

module.exports = function middlewares(app) {
  strap.files(process.cwd() + '/app/middlewares', app);
};
