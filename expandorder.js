#!/usr/local/bin/node

var Expander = require('./core/modules/parser/expander.js');
var pars = process.argv.slice(2);
if (pars.length === 1) {
  pars = pars[0].split(' ');
}


console.log(Expander.expand(pars, []));
