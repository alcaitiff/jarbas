//Dependencies
var uiTerminal = require('./modules/ui/terminal/terminal.js');
var Messages = require('./modules/messages/messages.js');
var Status = require('./status.js');
var Parser = require('./modules/parser/parser.js');
var Engine = require('./modules/engine/engine.js');
var Jarbas = {
  ui: uiTerminal,
  parser: Parser,
  engine: Engine,
  salute: function() {
    this.ui.say(Messages.HI);
  },
  toWork: function() {
    this.ui.ask(Messages.WHAT_CAN_I_DO, this.parse.bind(this));
  },
  parse: function(str) {
    var ret = this.doThis(str);
    //FIXME: toWork must control the ret.status
    if (ret.status != Status.EXIT) {
      this.toWork();
    }
  },
  doThis: function(str) {
    var requisition = this.parser.parse(str);
    var ret = this.engine.execute(requisition);
    this.ui.say(ret.msg);
    return ret;
  }
};

//console.log(chalk.blue('Olá'));

module.exports = Jarbas;
