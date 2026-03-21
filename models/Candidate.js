const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  slogan: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);