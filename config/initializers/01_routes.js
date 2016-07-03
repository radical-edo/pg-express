'use strict';
const router = require(process.cwd() + '/app/routes');

module.exports = function routes(app) {
  app.use(router);
};

