require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');
const Workout = require('./models/Workout');
const authenticateToken = require('./authenticateToken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send('Welcome to Pragati!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();
  try {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
          return res.status(401).send({ error: 'User not found.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).send({ error: 'Incorrect password.' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '2 days' });
      res.send({ message: 'Login successful', user: { username: user.username, email: user.email }, token });
  } catch (error) {
      res.status(500).send({ error: 'Internal server error', message: error.message });
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password, dob } = req.body;
  const normalizedEmail = email.trim().toLowerCase();
  try {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
          return res.status(409).send({ message: 'Email already in use.' });
      }
      const newUser = new User({ username, email: normalizedEmail, password, dob });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '2 days' });
      res.status(201).send({ message: 'User created successfully', user: { username: newUser.username, email: newUser.email }, token });
  } catch (error) {
      res.status(500).send({ error: 'Error creating user', message: error.message });
  }
});

app.post('/submit-workout', authenticateToken, async (req, res) => {
  console.log('Received workout data:', req.body);  // Log the complete body to see what you're actually receiving

  if (!req.body.workout) {
      console.error('Workout data is missing');
      return res.status(400).send({ message: 'Workout data is missing' });
  }

  try {
      const workout = new Workout({
          exercises: req.body.workout,
          userId: req.user.id  // Assuming authenticateToken correctly sets req.user.id
      });
      await workout.save();
      console.log('Workout saved:', workout);  // Log the saved workout data
      res.status(201).send({ message: 'Workout submitted successfully', workout: workout });
  } catch (error) {
      console.error('Workout submission error:', error);
      res.status(500).send({ error: 'Failed to submit workout', message: error.message });
  }
});


// Get all workouts for a user
app.get('/api/workouts', authenticateToken, async (req, res) => {
  try {
      const workouts = await Workout.find({ userId: req.user.id });
      res.status(200).json(workouts);
  } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).send({ error: 'Failed to fetch workouts' });
  }
});


// Delete a workout by ID
app.delete('/api/workouts/:id', authenticateToken, async (req, res) => {
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
