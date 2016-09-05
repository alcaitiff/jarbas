/**
 * Base prompt implementation
 * Should be extended by prompt types.
 */

var b = require('inquirer/lib/prompts/input');
var util = require('util');
var chalk = require('chalk');

var Prompt = module.exports = b;

Prompt.prototype.getQuestion = function() {
  var message = chalk.bold(this.opt.message) + ' ';

  // Append the default if available, and if question isn't answered
  if (this.opt.default != null && this.status !== 'answered') {
    message += chalk.dim('(' + this.opt.default+') ');
  }

  return message;
};
