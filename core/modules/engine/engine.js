var Messages = require('../messages/messages.js');
var Command = require('./command.js');
var CommandSilent = require('./command_silent.js');
var Exit = require('./exit.js');
var Engine = {
  supported: {},
  register: function(v) {
    this.supported[v.type] = v;
  },
  execute: function(requisition) {
    if (this.supported[requisition.type]) {
      return this.supported[requisition.type].run(requisition);
    } else {
      return {
        status: 'fail',
        msg: Messages.UNSUPPORTED
      };
    }
  }
};
//TODO:read it from somewhere
Engine.register(Command);
Engine.register(CommandSilent);
Engine.register(Exit);
module.exports = Engine;
