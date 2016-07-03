'use strict';
const cwd = process.cwd();
const router = require(cwd + '/app/routes');
const config = require(cwd + '/config');

module.exports = function routes(app) {
  app.use(config.apiNamespace, router);
};

