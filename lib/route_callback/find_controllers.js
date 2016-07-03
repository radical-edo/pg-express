'use strict';
const path = require('path');
const fs = require('fs');

module.exports = function findControllers(absolutPath) {
  const files = fs.readdirSync(absolutPath).filter(f => '.js' == path.extname(f)).map(f => f.replace('.js', ''));
  return files.reduce(function (controllers, file) {
    controllers[file.replace('_controller', '')] = require(absolutPath + `/${file}`);
    return controllers;
  }, {});
};
