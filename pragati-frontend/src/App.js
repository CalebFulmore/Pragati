import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomePage from './components/HomePage';
import WorkoutEntryForm from './components/WorkoutEntryForm';
import PastWorkouts from './components/PastWorkouts';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(response.status === 200);
      if (response.status !== 200) {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Pragati</h1>
          <h2>The Fitness App of the Future</h2>
          {isAuthenticated ? (
            <nav>
              <Link to="/">Home</Link> |
              <Link to="/workout">Workout Now</Link> |
              <Link to="/past-workouts">View Past Workouts</Link> |
              <button onClick={handleLogout}>Logout</button>
            </nav>
          ) : (
            <nav>
              <Link to="/login">Login</Link> |
              <Link to="/signup">Sign Up</Link>
            </nav>
          )}
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginForm onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/signup" element={<SignUpForm onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/workout" element={isAuthenticated ? <WorkoutEntryForm /> : <Navigate replace to="/login" />} />
            <Route path="/past-workouts" element={isAuthenticated ? <PastWorkouts /> : <Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate replace to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
