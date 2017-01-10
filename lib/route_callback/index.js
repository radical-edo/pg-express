'use strict';
const path = require('path');

const BPromise = require('bluebird');
const { includes } = require('lodash');

const findControllers = require('./find_controllers');
const controllers = findControllers(path.resolve(process.cwd() + '/app/controllers'));
const AbortCallChain = require('./errors/abort_call_chain');
const { NotFound, ReplySent } = require('../errors');

module.exports = function routeCallback(action, options = {}) {
  return function incomingRequest(req, res) {
    const [controllerName] = req.path.split('/').filter(str => !!str && '/' != str)
    const controller = new controllers[options.controller || controllerName + '_controller'](req, res);
    return BPromise.mapSeries(controller.__beforeFilters, function (filter) {
      const { only, except } = filter;
      return BPromise.try(function () {
        if (!only && !except || only && includes(only, action) || except && !includes(except, action)) {
          return controller[filter.name](action);
        }
      }).then(function shouldAbortEarly(aborting) {
        if (true === aborting) {
          throw new AbortCallChain(action);
        }
        return aborting;
      });
    }).then(function (filterAborts) {
      if (includes(filterAborts, true)) {
        return null;
      } else {
        return controller[action](action);
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
    }).catch(AbortCallChain, function (err) {
      console.info(err.message);
    }).catch(function (err) {
      console.error(err);
      const message = '500 Internal server error';
      res.status(500).send({ message });
    });
  };
};
