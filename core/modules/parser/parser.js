var Parser = {
  commands: [],
  orders: [],
  parse: function(string) {
    var command = this.prepare(string, this.orders);
    return this.run(command);
  },
  run: function(command) {
    switch (command[0]) {
      case 'ls':
        command.push('-h');
        command.push('--color=auto');
        return {
          type: 'command',
          value: command.shift(),
          pars: command
        };
      case 'xdg-open':
        return {
          type: 'command',
          value: command.shift(),
          pars: command
        };
      case 'exit':
      case 'bye':
      case 'quit':
        return {
          type: 'exit',
          value: null,
          pars: ''
        };
      default:
        return {
          type: 'invalid',
          value: command,
          pars: ''
        };
    }
  },
  prepare: function(string, orders) {
    var c = null;
    for (var i = 0; i < orders.length; i++) {
      if (c = this.fit(string, orders[i])) {
        return c;
      }
    }
    return string.split(' ');
  },
  fit: function(string, entry) {
    if (entry.request.exec(string)) {
      var command = [entry.command];
      command.push(string.replace(entry.request, entry.rep));
      return command;
    }
    return null;
  }
};
Parser.orders.push({
  request: /(abra|abrir|mostre|mostrar) (o |a |os |as |um |uma |uns |umas |)([^ ]*^)/,
  rep: '$3',
  command: 'xdg-open'
}, {
  request: /(pesquise|pesquisar) (pelo|pela|por|o|a|os|as|um|uma|uns|umas|) *(.*)/,
  rep: 'http://google.com/search?q=$3',
  command: 'xdg-open'
}, {
  request: /(abra|abrir|mostre|mostrar|) *(o|a|os|as|um|uma|uns|umas|) *(wiki) (do |da |dos |das |)(.*)/,
  rep: 'http://pt.wikipedia.org/wiki/$5',
  command: 'xdg-open'
});
module.exports = Parser;
