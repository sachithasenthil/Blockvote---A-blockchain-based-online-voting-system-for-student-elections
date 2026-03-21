const mongoose = require('mongoose');

const blockchainSchema = new mongoose.Schema({
  chain: {
    type: Array,
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BlockchainData', blockchainSchema);