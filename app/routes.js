'use strict';
const router = require('express').Router();
const routeCallback = require('../lib/route_callback');

router.delete('/users/:id', routeCallback('destroy'));
router.patch('/users/:id', routeCallback('update'));
router.get('/users/:id', routeCallback('show'));
router.post('/users', routeCallback('create'));
router.get('/users', routeCallback('index'));

router.get('/me', routeCallback('index'));

router.delete('/auth', routeCallback('destroy'));
router.post('/auth', routeCallback('create'));

module.exports = router;
