'use strict';
const path = require('path');
const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));

const strap = require('node-strap');
const express = require('express');

const config = require('./config');

const app = express();

strap.files(process.cwd() + '/config/initializers', app);

app.listen(config.port, function () {
  console.log('Server listening on', config.port);
});

