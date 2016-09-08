var Expander = {
  parse: function(str) {
    if (str.charAt(0) === '[' && str.charAt(str.length - 1) === ']') {
      str = str.slice(1, -1);
      var result = str.split('|');
      result.push('');
      return result;
    } else {
      return str.split('|');
    }
  },
  expand: function(p, r) {
    if (!p.length) {
      return r;
    }
    var first = p.shift();
    var parsed = this.parse(first);
    if (!r.length) {
      r = parsed;
      return this.expand(p, r);
    } else {
      var results = [];
      for (var i = 0; i < r.length; i++) {
        for (var j = 0; j < parsed.length; j++) {
          results.push((r[i] + ' ' + parsed[j]).trim());
        }
      }
      return this.expand(p, results);
    }
  }
};
module.exports = Expander;
