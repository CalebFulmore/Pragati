import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import WorkoutEntryForm from './WorkoutEntryForm';
import PastWorkouts from './PastWorkouts';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Pragati</h1>
      <h2>The Fitness App of the Future</h2>
      <nav>
        <Link to="/">Home</Link> | <Link to="/workout">Workout Now</Link> | <Link to="/past-workouts">View Past Workouts</Link>
      </nav>
      <Outlet />  {/* This is where nested routes will render */}
    </div>
  );
}

export default HomePage;


