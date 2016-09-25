var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var wordSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: Array,
    required: true,
    unique: false
  }
  //TODO:Add the data information or reference it
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
