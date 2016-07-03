'use strict';
const path = require('path');

const BPromise = require('bluebird');
const { includes } = require('lodash');

const findControllers = require('./find_controllers');
const { ReplySent } = require('../errors');

const controllers = findControllers(path.resolve(process.cwd() + '/app/controllers'));

module.exports = function routeCallback(action, options = {}) {
  return function incomingRequest(req, res) {
    const [controllerName] = req.path.split('/').filter(str => !!str && '/' != str)
    const controller = new controllers[options.controller || controllerName + '_controller'](req, res);
    return BPromise.all(controller.__beforeFilters.map(function (filter) {
      const { only } = filter;
      return BPromise.try(function () {
        if (only && includes(only, action)) {
          console.log(filter.name);
          return controller[filter.name]();
        }
      }).catch(function (err) {
        console.log(`Response for ${controllerName}#${action} aborted early`);
        console.log(err.message);
        return true;
      });
    })).then(function (filterAborts) {
      if (includes(filterAborts, true)) {
        return null;
      } else {
        return controller[action]();
      }
    }).catch(function (err) {
      console.error(err);
      const message = 'Oops, something went wrong';
      res.status(500).send({ message });
    });
  };
};

