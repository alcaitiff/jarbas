var Messages = require('../messages/messages.js');
var Status = require('../../status.js');
var child_process = require('child_process');

var Command = {
  type: 'command',
  run: function(r) {
    child_process.spawnSync(r.value, r.pars, {
      stdio: "inherit"
    });
    return {
      msg: '',
      status: Status.OK
    };
  }
};
module.exports = Command;
