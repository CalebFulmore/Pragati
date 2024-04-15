require('dotenv').config(); // Make sure this line is at the top
const Workout = require('./models/Workout');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

//CORS install
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
console.log('Connecting to MongoDB with URI:', process.env.DB_URI);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

// Middlewares
app.use(express.json()); // This is to handle JSON payloads

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to Pragati!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Other imports...
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to parse JSON
app.use(express.json());

//Workout posting route
app.post('/submit-workout', async (req, res) => {
  console.log('Received workout data:', req.body.workout);
  try {
    // Assuming req.body.workout is the array of exercises with their sets
    const workoutData = req.body.workout;

    // Save workout data to MongoDB
    const workout = new Workout({ exercises: workoutData });
    await workout.save();

    // Send a success response
    res.status(201).send({ message: 'Workout submitted successfully' });
  } catch (error) {
    console.error('Workout submission error:', error);
    // Handle errors
    console.error('Workout submission error:', error);
    res.status(500).send({ error: 'Failed to submit workout' });
  }
});


// Delete a workout by ID
app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).send({ message: 'Workout not found' });
    }
    res.status(200).send({ message: 'Workout deleted', workout });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).send({ error: 'Failed to delete workout' });
  }
});



// Signup route
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '2 days' });
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).send({ message: error.message }); // Send back a more detailed error message
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: 'Login failed!' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '2 days' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to retrieve past workouts
app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find(); // This will retrieve all workouts
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).send({ error: 'Failed to fetch workouts' });
  }
});



