'use strict';
const path = require('path');

const BPromise = require('bluebird');
const { includes } = require('lodash');

const findControllers = require('./find_controllers');
const controllers = findControllers(path.resolve('../../app/controllers'));
const { NotFound, ReplySent } = require('../errors');

module.exports = function routeCallback(action, options = {}) {
  return function incomingRequest(req, res) {
    const [controllerName] = req.path.split('/').filter(str => !!str && '/' != str)
    const controller = new controllers[options.controller || controllerName + '_controller'](req, res);
    return BPromise.all(controller.__beforeFilters.map(function (filter) {
      const { only, except } = filter;
      return BPromise.try(function () {
        if (!only && !except || only && includes(only, action) || except && !includes(except, action)) {
          return controller[filter.name](action);
        }
      }).catch(NotFound, function (err) {
        const { message } = err;
        res.status(404).send(message);
        return true;
      }).catch(ReplySent, function (err) {
        const { message, reason } = err;
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
      const message = '500 Internal server error';
      res.status(500).send({ message });
    });
  };
};
