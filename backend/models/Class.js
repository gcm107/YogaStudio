const mongoose = require('mongoose');

// schema for class 
const classSchema = new mongoose.Schema({
  I_ID: {type: String, required: true},

  day: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  classType: {
    type: String,
    enum: ['General', 'Special'],
    required: true
  },

  specialClassDescription: {
    type: String,
    required: function() { return this.classType === 'Special'; }
  },

  payRate: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
