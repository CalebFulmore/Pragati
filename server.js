require('dotenv').config(); // Make sure this line is at the top
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

//CORS install
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
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

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

