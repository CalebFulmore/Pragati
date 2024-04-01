import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/workout">Workout Now</Link> |{" "}
      <Link to="/past-workouts">View Past Workouts</Link>
    </nav>
  );
};

export default NavigationBar;
