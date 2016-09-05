var Status = require('../../status.js');
var child_process = require('child_process');

var Command = {
  type: 'commandSilent',
  run: function(r) {
    var ret = child_process.spawnSync(r.value, r.pars, {});
    return {
      msg: ret.stdout.toString(),
      status: Status.OK
    };
  }
};
module.exports = Command;
