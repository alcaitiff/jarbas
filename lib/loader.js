#!/usr/local/bin/node

var mongoose = require('mongoose');
var Pattern = require('../core/model/pattern.js');
var Order = require('../core/model/order.js');
var Word = require('../core/model/word.js');
var Expander = require('../core/modules/parser/expander.js');
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});


var fr = require('./fileretriever.js');
var patternFiles = fr.getFiles(['../core/language/sentences'], [
  'package.json',
  'node_modules'
], ['json']);
var orderFiles = fr.getFiles(['../core/orders'], [
  'package.json',
  'node_modules'
], ['json']);
var wordFiles = fr.getFiles(['../core/language/words'], [
  'package.json',
  'node_modules'
], ['json']);

mongoose.connect('mongodb://localhost/jarbas');
var files = patternFiles.length + orderFiles.length + wordFiles.length;
console.log("Total de arquivos:" + files);
var patterns = null;
var words = [];
var taglists = 0;
var orders = [];
var done = 0;

wordFiles.forEach(function(path, index) {
  fr.readFile(path, function(src) {
    src.words.forEach(function(val, index) {
      Object.keys(val).forEach(function(key, index) {
        words[key] = 1;
        taglists++;
        Word.findOne({
          name: key
        }, addWord.bind(this, key, val[key]));
      });
    });
  });
});

orderFiles.forEach(function(path, index) {
  fr.readFile(path, function(jsonorder) {
    Order.findOne({
      name: jsonorder.name
    }, addOrder.bind(this, jsonorder));
  });
});


setTimeout(report, 1000);

function addOrder(jsonorder, err, obj) {
  if (err) throw err;
  if (obj !== null) {
    done++;
    //console.log(obj.name + ' already in DB');
    orders[obj.name] = obj;
  } else {
    var o = Order({
      name: jsonorder.name,
      type: jsonorder.type,
      _id: new mongoose.Types.ObjectId(),
      responses: jsonorder.responses
    });
    o.save(function(err) {
      done++;
      if (err) throw err;
      orders[o.name] = o;
      console.log('Pattern "' + o.name + '" created');
    });
  }
}

function addWord(key, tags, err, obj) {
  if (err) throw err;
  if (obj !== null) {
    if (!containsArray(obj.tags, tags)) {
      obj.tags.push(tags);
      obj.save(function(err) {
        done++;
        if (err) throw err;
        console.log('Word on DB tags added:');
        console.log(tags);
      });
    } else {
      console.log(obj.name + ' already in DB');
      done++;
    }
  } else {
    var o = Word({
      name: key,
      tags: [tags]
    });
    o.save(function(err) {
      done++;
      if (err) throw err;
      console.log('Word "' + key + '" created');
    });
  }
}

function addPatternFiles() {
  patternFiles.forEach(function(path, index) {
    fr.readFile(path, function(obj) {
      obj.patterns.forEach(function(val, index) {
        var list = Expander.expand(val);
        patterns = (patterns) ? list.length + patterns : list.length;
        list.forEach(function(pat) {
          Pattern.findOne({
            "pattern": pat
          }, addPattern.bind(this, obj.type, pat));
        });
      });
    });
  });
}

function addPattern(type, pat, err, obj) {
  if (err) throw err;
  if (obj !== null) {
    done++;
  } else {
    var p = Pattern({
      name: type,
      pattern: pat,
      words: pat.split(' '),
      order: orders[type]
    });
    p.save(function(err) {
      done++;
      if (err) throw err;
      console.log('Pattern "' + pat + '" created');
    });
  }
}

function report() {
  var p = patterns || 0;
  console.log("Total de arquivos:" + (patternFiles.length + orderFiles.length + wordFiles.length) +
    " Patterns:" + p +
    " Words:" + words.length +
    " Taglists:" + taglists +
    " Orders:" + orderFiles.length +
    " Done:" + done);
  if (done === orderFiles.length + taglists) {
    addPatternFiles();
  }
  if (patterns === null || done < (patterns + orderFiles.length + taglists)) {
    setTimeout(report, 1000);
  } else {
    mongoose.disconnect();
  }
}

function containsArray(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (arrayHasArray(a[i], b)) {
      return true;
    }
  }
  return false;
}

function arrayHasArray(a, b) {
  if (b.length > a.length) {
    return false;
  }
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return false;
    }
  }
  return true;
}
