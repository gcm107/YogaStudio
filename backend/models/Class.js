const mongoose = require('mongoose');

// schema for class collection in mongo
// based on canvas instructions and use cases.
const classSchema = new mongoose.Schema({

  // using the I_ID from the instructor collection in mongoose
  // for the dropdown in frontend
  I_ID: {type: String, required: true},

  day: {type: String, required: true},

  time: {type: String,required: true},

  // from canvas instructions, type of class
  classType: {type: String, enum: ['General', 'Special'], required: true},

  specialClassDescription: {type: String, required: function() { return this.classType === 'Special'; }},

  payRate: {type: Number, required: true},

  isPublished: {type: Boolean, default: false},

}, 

// timestamp for when the class was added
{timestamps: true}

); 

// exporting so we can use it
module.exports = mongoose.model('Class', classSchema);
