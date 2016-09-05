/**
 * `input` type prompt
 */

var Base = require('./base');
var i = require('inquirer/lib/prompts/input');
var util = require('util');
var chalk = require('chalk');
/**
 * Module exports
 */

module.exports = Prompt;

/**
 * Constructor
 */

function Prompt() {
  return Base.apply(this, arguments);
}
util.inherits(Prompt, i);
util.inherits(Prompt, Base);
