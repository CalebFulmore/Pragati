const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  reps: Number,
  weight: Number,
});

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: [setSchema],
});

const workoutSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
