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
  },
  words: {
    type: Array,
    required: true,
    unique: false
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: false
  }

});

var Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;
