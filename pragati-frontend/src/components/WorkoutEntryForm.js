import React, { useState } from 'react';
import axios from 'axios';


function WorkoutEntryForm() {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);
  const [weight, setWeight] = useState([]);

  const handleAddSet = () => {
    // Add a new set to the sets array
    // You might want to validate input before adding the set
    // For example, ensure that reps and weight are numbers
    // You can also add validation for exercise selection
    // Here's a basic example of how to add a set:
    const newSet = { reps, weight };
    setSets([...sets, newSet]);
    setReps(''); // Clear reps input field after adding set
    setWeight(''); // Clear weight input field after adding set
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send workout data to backend API
      const response = await axios.post('http://localhost:3000/workout', { exercise, reps, weight });
      console.log('Workout data sent successfully', response.data);
      // Handle success, for example, show a success message or redirect to another page
    } catch (error) {
      console.error('Error sending workout data', error);
      // Handle error, for example, show an error message to the user
    }
  };

  return (
    <div>
      <h2>Enter Workout Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Exercise:</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
        />

        <label>Sets:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />

        <label>Reps:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <button type="button" onClick={handleAddSet}>
          Add Set
        </button>

        <button type="submit">Submit Workout</button>
      </form>
    </div>
  );
}

export default WorkoutEntryForm;
