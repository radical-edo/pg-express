'use strict';
const router = require('express').Router();
const routeCallback = require('../lib/route_callback');

router.get('/foo', routeCallback('index'));

module.exports = router;
