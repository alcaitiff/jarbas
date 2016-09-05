#!/usr/local/bin/node

var Jarbas = require('./core/jarbas.js');
var pars = process.argv.slice(2);
if (pars.length) {
  Jarbas.doThis(pars.join(' '));
} else {
  Jarbas.salute();
  Jarbas.toWork();
}
