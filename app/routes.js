'use strict';
const router = require('express').Router();
const routeCallback = require('../lib/route_callback');

router.get('/foo', routeCallback('index'));
router.post('/foo_bar', routeCallback('show', { controller: 'foo_controller' }));

module.exports = router;
