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
  parse: function(awnser) {
    var requisition = this.parser.parse(awnser);
    var ret = this.engine.execute(requisition);
    this.ui.say(ret.msg);
    if (ret.status != Status.EXIT) {
      this.toWork();
    }
  }
};

//console.log(chalk.blue('Olá'));

module.exports = Jarbas;
