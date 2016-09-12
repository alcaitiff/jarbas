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
  responses: [{
    type: String,
    required: true,
    unique: false
  }]

});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
