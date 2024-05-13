const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    reps: Number,
    weight: Number
});

const exerciseSchema = new mongoose.Schema({
    name: String,
    sets: [setSchema]
});

const workoutSchema = new mongoose.Schema({
    exercises: [exerciseSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
