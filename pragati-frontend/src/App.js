import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomePage from './components/HomePage';
import WorkoutEntryForm from './components/WorkoutEntryForm'; // Adjust the path as necessary


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Remove the useNavigate hook from here

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Create a new component for navigation buttons
  function NavigationButtons() {
    const navigate = useNavigate(); // Now useNavigate is called within the context of Router

    // Go to the sign-up page
    const goToSignUp = () => {
      navigate('/signup');
    };

    // Go to the login page
    const goToLogin = () => {
      navigate('/login');
    };

    return (
      <div>
        <button onClick={goToSignUp}>Need an account? Sign up</button>
        <button onClick={goToLogin}>Have an account? Log in</button>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Pragati</h1>
          <h2>The Fitness App of the Future</h2>

          <Routes>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/signup" element={<SignUpForm onAuthSuccess={handleAuthSuccess} />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/workout" element={<WorkoutEntryForm />} />
          </Routes>
        </header>

        {!isAuthenticated && <NavigationButtons />} {/* Use the new component */}
      </div>
    </Router>
  );
}

export default App;
