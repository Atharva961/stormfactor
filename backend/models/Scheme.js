const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;
