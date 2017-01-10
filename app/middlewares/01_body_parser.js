'use strict';
const bodyParser = require('body-parser');
const { apiNamespace } = require('../../config');
const { attempt, isObject, isError } = require('lodash');
const { BadRequest } = require('../../lib/errors');

module.exports = function bodyParserMiddleware(app) {
  app.use(apiNamespace, bodyParser.json({
    verify: function jsonPayload(req, res, buff, encoding) {
      const body = attempt(JSON.parse.bind(null, buff.toString()));
      if (buff.toString().length && (!isObject(body) || isError(body))) {
        const message = 'Payload is not a valid JSON string';
        res.status(400).send({ message });
        throw new BadRequest(message); // needed to abort the express-body parser from parsing
      }
    }
  }));
}
