'use strict';
const BPromise = require('bluebird');
const Joi = require('joi');

const validateAsync = BPromise.promisify(Joi.validate);

const validator = function validator(params, schema) {
  return validateAsync(params, schema, { abortEarly: false })
    .then(() => null)
    .catch(function (err) {
      return err.details.map(validator.__mapAsApiError(params));
    });
};

validator.__mapAsApiError = function __mapAsApiError(params) {
  return function __buildApiError(detail) {
    const {
      message, context: { key: path } = {}
    } = detail;
    const value = undefined !== params[path] ? params[path] : null;
    return { message, path, value };
  };
};

module.exports = validator;
