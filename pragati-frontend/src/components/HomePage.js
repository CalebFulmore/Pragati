import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Removed BrowserRouter as Router
import WorkoutEntryForm from './WorkoutEntryForm';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Pragati</h1>
      <h2>The Fitness App of the Future</h2>
      <Link to="/workout">Workout Now!</Link>

      <Routes>
        <Route path="/workout" element={<WorkoutEntryForm />} />
      </Routes>
    </div>
  );
}

export default HomePage;
