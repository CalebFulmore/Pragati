import React, { useState } from 'react';
import axios from 'axios';

function WorkoutEntryForm() {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [workout, setWorkout] = useState([]);

  const handleAddSet = () => {
    const newSet = { reps: Number(reps), weight: Number(weight) };
    setSets([...sets, newSet]); // Add the new set to the list
    setReps('');
    setWeight('');
  };

  const handleSaveExercise = () => {
    const newExercise = { name: exercise, sets };
    setWorkout([...workout, newExercise]); // Add the completed exercise to the workout
    // Reset for a new exercise
    setExercise('');
    setSets([]);
  };

  const handleSubmitWorkout = async () => {
    try {
      await axios.post('http://localhost:3000/submit-workout', { workout });
      alert('Workout submitted successfully');
      // Reset the workout
      setWorkout([]);
    } catch (error) {
      console.error('Error submitting workout', error);
      alert('Error submitting workout');
    }
  };

  const setOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div>
      <h2>Enter Workout Details</h2>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        disabled={sets.length > 0}
      />
      {exercise && (
        <>
          <p>How many reps and how much weight did you do on your {setOrdinal(sets.length + 1)} set of {exercise}?</p>
          <input
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button onClick={handleAddSet}>Add Set</button>
        </>
      )}
      {sets.length > 0 && (
        <button onClick={handleSaveExercise}>Save Completed Exercise to Workout</button>
      )}
      {workout.length > 0 && (
        <>
          <button onClick={handleSubmitWorkout}>Finish Workout</button>
          <div>Exercises in workout: {workout.map(e => <div key={e.name}>{e.name}</div>)}</div>
        </>
      )}
    </div>
  );
}

export default WorkoutEntryForm;
