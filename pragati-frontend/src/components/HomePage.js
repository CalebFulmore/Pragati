import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutEntryForm from './WorkoutEntryForm';
import { Routes, Route } from 'react-router-dom'; // Ensure Routes and Route are imported if you're adding new routes here

function HomePage() {
  return (
    <div>
      <h1>Welcome to Pragati</h1>
      <h2>The Fitness App of the Future</h2>
      <nav>
      <Link to="/">Home</Link> | <Link to="/workout">Workout Now</Link> | <Link to="/past-workouts">View Past Workouts</Link>
      </nav>

      <Routes>
        <Route path="/workout" element={<WorkoutEntryForm />} />
        {/* You will need to create and import a PastWorkouts component */}
        {/* <Route path="/past-workouts" element={<PastWorkouts />} /> */}
      </Routes>
    </div>
  );
}

export default HomePage;

