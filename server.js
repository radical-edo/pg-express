'use strict';
const path = require('path');
const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));
const strap = require('node-strap');
const express = require('express');

const app = express();

strap.files(process.cwd() + '/config/initializers', app);

app.listen(5000, function () {
  console.log('Server listening on', 5000);
});

