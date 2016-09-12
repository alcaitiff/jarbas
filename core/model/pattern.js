var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var patternSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  pattern: {
    type: String,
    required: true,
    unique: true
  }
});

var Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;
