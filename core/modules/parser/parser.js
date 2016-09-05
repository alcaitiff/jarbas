var Parser = {
  parse: function(string) {
    var command = string.split(' ');
    switch (command[0]) {
      case 'ls':
        command.push('-h');
        command.push('--color=auto');
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
          value: string,
          pars: ''
        };
      default:
        return {
          type: 'invalid',
          value: string,
          pars: ''
        };
    }
  }
};

module.exports = Parser;
