'use strict';
const path = require('path');

const strap = require('node-strap');
global.expect = require('expect');
global.Factory = require('rosie').Factory;

strap.files(__dirname + '/factories');
