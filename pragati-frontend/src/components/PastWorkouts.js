import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PastWorkouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/workouts'); // Adjust the URL as needed
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Past Workouts</h2>
      {workouts.map((workout, index) => (
        <div key={index}>
          <h3>Workout on {new Date(workout.date).toLocaleDateString()}</h3>
          {workout.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex}>
              <p>Exercise: {exercise.name}</p>
              {exercise.sets.map((set, setIndex) => (
                <p key={setIndex}>Set {setIndex + 1}: {set.reps} reps, {set.weight} lbs</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PastWorkouts;
