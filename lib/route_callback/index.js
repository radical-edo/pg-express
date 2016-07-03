'use strict';
const path = require('path');

const BPromise = require('bluebird');

const findControllers = require('./find_controllers');

const controllers = findControllers(path.resolve(process.cwd() + '/app/controllers'));

module.exports = function routeCallback(action, options = {}) {
  return function incomingRequest(req, res) {
    const [controllerName] = req.path.split('/').filter(str => !!str && '/' != str)
    const controller = new controllers[controllerName](req, res);
    return BPromise.all(controller.__beforeFilters.map(function (filter) {
      return controller[filter.name]();
    })).then(function () {
      return controller[action]();
    }).catch(function (err) {
      console.error(err);
      const message = 'Oops, something went wrong';
      res.status(500).send({ message });
    });
  };
};

