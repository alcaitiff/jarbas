#!/usr/local/bin/node

var mongoose = require('mongoose');
var Pattern = require('../core/model/pattern.js');
var Expander = require('../core/modules/parser/expander.js');
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

var fr = require('./fileretriever.js');
var files = fr.getFiles(['../core/language'], [
  'package.json',
  'node_modules'
], ['json']);
mongoose.connect('mongodb://localhost/jarbas');
console.log("Total de arquivos:" + files.length);
var patterns = 0;
var done = 0;
files.forEach(function(path, index) {
  fr.readFile(path, function(obj) {
    obj.patterns.forEach(function(val, index) {
      var list = Expander.expand(val);
      patterns += list.length;
      console.log("Total de arquivos:" + files.length +
        " Patterns:" + patterns + " Done:" + done);
      list.forEach(function(pat) {
        Pattern.findOne({
          pattern: pat
        }, addPattern.bind(this, obj.type, pat));
      });
    });
  });
});
setTimeout(report, 1000);

function addPattern(type, pat, err, obj) {
  if (err) throw err;
  if (obj !== null) {
    done++;
    console.log(obj.pattern + ' already in DB');
  } else {
    var p = Pattern({
      name: type,
      pattern: pat
    });
    p.save(function(err) {
      done++;
      if (err) throw err;
      console.log('Pattern "' + pat + '" created');
    });
  }
}

function report() {
  console.log("Total de arquivos:" + files.length + " Patterns:" +
    patterns + " Done:" + done);
  if (done < patterns) {
    setTimeout(report, 1000);
  } else {
    mongoose.disconnect();
  }
}
//mongoose.disconnect();
