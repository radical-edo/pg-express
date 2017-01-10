'use strict';
const moment = require('moment');

const { User, Token } = require('../models');
const {
  apiNamespace,
  auth: { header, timeout } = {}
} = require('../../config');
const { Unauthorized } = require('../../lib/errors');

const AUTH_HEADER = 'Authorization';

const authorizeMiddleware = function authorizeMiddleware(app) {
  app.use(apiNamespace, function(req, res, next) {
    if (req.path === '/auth' && req.method === 'POST') {
      return next();
    }
    const auth_header = req.get(AUTH_HEADER) || '';
    const access_token = auth_header.split('/')[1];
    Token.findOne({
      where: { access_token },
      include: [{model: User, as: 'user'}]
    }).then(function (token) {
      if (null == token) {
        throw new Unauthorized({
          received: [access_token],
          field: [AUTH_HEADER, 'Bearer']
        });
      } else {
        return [token, moment(token.expires_at).isBefore(moment.utc().toDate())];
      }
    }).spread(function (token, hasExpired) {
      if (true === hasExpired) {
        throw new Unauthorized({
          info: 'Token has expired',
          received: [access_token],
          field: [AUTH_HEADER, 'Bearer']
        });
      } else {
        token.resetExpirationDate();
        return token.save();
      }
    }).then(authorizeMiddleware.setCurrentUser(req, res)).then(function () {
      next()
      return null;
    }).catch(Unauthorized, authorizeMiddleware.sendResponse(res))
  });
}

authorizeMiddleware.setCurrentUser = function setCurrentUser(req, res) {
  return function (token) {
    req.token = token;
    req.currentUser = token.user;
    res.set(header, timeout);
    return token;
  };
}

authorizeMiddleware.sendResponse = function sendResponse(res) {
  return function (err) {
    const { errors } = err;
    res.status(401).send({ errors });
  };
}

module.exports = authorizeMiddleware;
