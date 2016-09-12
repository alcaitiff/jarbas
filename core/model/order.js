var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var orderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    unique: false
  },
  response: {
    type: String,
    required: true,
    unique: false
  }
});

var Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;
