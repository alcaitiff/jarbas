var Parser = {
  commands: [],
  parse: function(string) {
    var command = this.prepare(string, this.commands);
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
          type: 'commandSilent',
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
  prepare: function(string, commands) {
    var c = null;
    for (var i = 0; i < commands.length; i++) {
      if (c = this.fit(string, commands[i])) {
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
Parser.commands.push({
  request: new RegExp(
    '(abra|abrir|mostre|mostrar) (o |a |os |as |um |uma |uns |umas |)(.*)'
  ),
  rep: '$3',
  command: 'xdg-open'
}, {
  request: new RegExp(
    '(pesquise|pesquisar) (pelo |pela |por |o |a |os |as |um |uma |uns |umas |)(.*)'
  ),
  rep: 'http://google.com/search?q=$3',
  command: 'xdg-open'
}, {
  request: new RegExp(
    '(wiki) (.*)'
  ),
  rep: 'https://pt.wikipedia.org/wiki/$2',
  command: 'xdg-open'
});
module.exports = Parser;
