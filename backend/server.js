const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware for frontend to backend comms 
app.use(cors());
app.use(express.json());

// testing to make sure it runs
app.get('/', (req, res) => {
  res.json({ message: 'Yoga Studio API is running!' });
});

// routes
app.use('/api/instructors', require('./routes/instructors'));
app.use('/api/classes', require('./routes/classes'));

// connecting to monfodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => {
    console.error('MongoDB Atlas connection error:', err);
    process.exit(1);
  });

  // outputing what its running on
app.listen(PORT, () => {
  console.log(`Yoga Studio is running on port ${PORT}`);
});
