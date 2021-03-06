'use strict';
const strap = require('node-strap');
const express = require('express');

const config = require('./config');

const app = express();

strap.files(__dirname + '/config/initializers', app);

app.listen(config.port, function () {
  console.log('Server listening on', config.port);
  console.log('All routes are behind', config.apiNamespace);
});

