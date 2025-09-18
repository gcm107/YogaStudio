const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({

  I_ID: {type: String, unique: true},

  firstName: {type: String, required: true, trim: true},

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  preferredCommunication: {
    type: String,
    enum: ['phone', 'email'],
    required: true
  }
}, 

{ timestamps: true}
);

module.exports = mongoose.model(
  'Instructor', instructorSchema
);
