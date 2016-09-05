var Messages = require('../messages/messages.js');
var Status = require('../../status.js');
var Exit = {
  type: 'exit',
  run: function(r) {
    return {
      msg: Messages.BYE,
      status: Status.EXIT
    };
  }
};
module.exports = Exit;
