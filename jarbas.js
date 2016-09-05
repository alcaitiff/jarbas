#!/usr/local/bin/node
 //Dependencies
var clear = require('clear');
var chalk = require('chalk');
var inquirer = require('inquirer');
inquirer.registerPrompt('input2', require('./ui/input.js'));
clear();
console.log(chalk.blue('Olá'));

function ask() {
  var question = [{
    name: 'q',
    type: 'input2',
    message: 'O que posso fazer por você? ',
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Posso encerrar se você pedir.';
      }
    }
  }];
  inquirer.prompt(question).then(work);
}

function work(par) {
  console.log(par['q']);
  ask();
}
ask();
