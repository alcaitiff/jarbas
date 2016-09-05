//var chalk = require('chalk');
var inquirer = require('inquirer');
inquirer.registerPrompt('myinput', require('./input.js'));

module.exports = {
  say: function(msg) {
    console.log(msg);
  },
  ask: function(q, callback) {
    var question = [{
      name: 'q',
      type: 'myinput',
      message: q,
      validate: function(value) {
        if (value.length) {
          return true;
        }
      }
    }];
    inquirer.prompt(question).then(function(a) {
      callback(a['q']);
    });
  }
};
