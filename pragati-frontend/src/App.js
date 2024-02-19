// App.js
import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomePage from './components/HomePage'; // You need to create this component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    setIsAuthenticated(true); // Update the authentication status
  };

  if (isAuthenticated) {
    return <HomePage />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Pragati</h1>
          <h2>The Fitness App of the Future</h2>
          
          {isLoggingIn ? (
            <>
              <LoginForm onAuthSuccess={handleAuthSuccess} />
              <button onClick={() => setIsLoggingIn(false)}>Need an account? Sign up</button>
            </>
          ) : (
            <>
              <SignUpForm onAuthSuccess={handleAuthSuccess} />
              <button onClick={() => setIsLoggingIn(true)}>Have an account? Log in</button>
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
