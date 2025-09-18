const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// GET 
// all of the instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST 
// the newinstructor
router.post('/', async (req, res) => {
  try {
    // check to confirm if first and last name already exists
    const existingInstructor = await Instructor.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    if (existingInstructor) {
      return res.status(400).json({ 
        message: 'Instructor with this name already exists',
        existingInstructor: existingInstructor
      });
    }

    // counting instructors so we can add the next id to the created instructor
    const instructorCount = await Instructor.countDocuments();
    const nextId = instructorCount + 1;
    // padding so it looks like the output shown in the usecases canvas page
    const I_ID = 'I' + nextId.toString().padStart(5, '0'); // I00001, I00002, etc.

    // creating instructor using the next ID
    const instructorData = {
      ...req.body,
      I_ID: I_ID
    };

    const instructor = new Instructor(instructorData);
    const savedInstructor = await instructor.save();
    
    // success message or error messages 
    res.status(201).json({
      instructor: savedInstructor,
      welcomeMessage: `Welcome to Yoga'Hom! ... Your instructor id is ${I_ID}.`
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
