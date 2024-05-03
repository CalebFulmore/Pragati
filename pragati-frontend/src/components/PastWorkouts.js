import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PastWorkouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the stored token
        const { data } = await axios.get('http://localhost:3000/api/workouts', {
          headers: {
            Authorization: `Bearer ${token}` // Use the token in the authorization header
          }
        });
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Ensure you also send the token when deleting
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await axios.delete(`http://localhost:3000/api/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Use the token in the authorization header
          }
        });
        setWorkouts(workouts.filter((workout) => workout._id !== id));
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  return (
    <div>
      <h2>Past Workouts</h2>
      {workouts.map((workout, index) => (
        <div key={workout._id || index}>
          <h3>Workout on {new Date(workout.date).toLocaleDateString()}</h3>
          {workout.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex}>
              <p>Exercise: {exercise.name}</p>
              {exercise.sets.map((set, setIndex) => (
                <p key={setIndex}>Set {setIndex + 1}: {set.reps} reps, {set.weight} lbs</p>
              ))}
            </div>
          ))}
          <button onClick={() => handleDelete(workout._id)}>Delete Workout</button>
        </div>
      ))}
    </div>
  );
}

export default PastWorkouts;
