import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkoutEntryForm from './WorkoutEntryForm';

function HomePage() {
  return (
    <Router>
      <div>
        <h1>Welcome to Pragati</h1>
        <h2>The Fitness App of the Future</h2>
        <Link to="/workout">Workout Now!</Link>

        <Routes>
          <Route path="/workout" element={<WorkoutEntryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default HomePage;
