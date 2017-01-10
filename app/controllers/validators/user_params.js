'use strict';
const Joi = require('joi');

const validator = require('./__validator');

const SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  last_name: Joi.string(),
  first_name: Joi.string()
});

const userParams =  {
  validate(params) {
    return validator(params, SCHEMA);
  }
};

module.exports = userParams;
