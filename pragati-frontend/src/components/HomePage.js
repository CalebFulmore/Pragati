import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import WorkoutEntryForm from './WorkoutEntryForm';
import PastWorkouts from './PastWorkouts';

function HomePage() {
  return (
    <div>
     
      <Outlet />  {/* This is where nested routes will render */}
    </div>
  );
}

export default HomePage;


