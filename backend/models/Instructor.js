// instructor schema for mongodb
const mongoose = require('mongoose');

// constructing the schema 
const instructorSchema = new mongoose.Schema({

  // instructions on canvas tell us to use I_ID
  I_ID: {type: String, unique: true},

  firstName: {type: String, required: true, trim: true},

  lastName: {type: String, required: true, trim: true},

  address: {type: String, required: true},

  phone: {type: String, required: true},

  email: {type: String, required: true, unique: true, lowercase: true, trim: true},

  preferredCommunication: {type: String, enum: ['phone', 'email'], required: true},

}, 

// timestamp for when it was created or updated
{timestamps: true}

);

// exporting so we can use it
module.exports = mongoose.model(
  'Instructor', instructorSchema
);
