const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// GET 
// getting all of the classes
router.get('/', async (req, res) => {

  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
  
});

// POST
//  adding anew class
router.post('/', async (req, res) => {
  try {

    // checking for schedule conflicts 
    const conflictingClass = await Class.findOne({
      day: req.body.day,

      time: req.body.time,

      isPublished: true
    });

    if (conflictingClass) {
      return res.status(400).json({ 

        message: 'Oh No! There is a schedule conflict: A class is already scheduled at this day and time',
        
        conflictingClass: conflictingClass,

        suggestion: 'Please choose a different day or time'

      });
    }

    // creating the class
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    
    // success message
    res.status(201).json({
      class: savedClass,
      confirmationMessage: 'New class has been successfully scheduled.',

      // manager message
      managerMessage: `Class scheduled for ${savedClass.day} at ${savedClass.time}`,

      // instructor message
      instructorMessage: `Instructor ${savedClass.I_ID}: You have been assigned to teach a ${savedClass.classType} class on ${savedClass.day} at ${savedClass.time}. Pay rate: $${savedClass.payRate}`
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT 
// to list the new class schedule
router.put('/:id/publish', async (req, res) => {
  try {
    const classToPublish = await Class.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );

    // if the class is not found
    if (!classToPublish) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // success message
    res.json({
      class: classToPublish,
      message: 'Class schedule has been published successfully'
    });
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
