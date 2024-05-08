import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add this line to get the navigate function

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/signup', { username, email, password });
      console.log('Account created successfully', response.data);
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      onAuthSuccess(response.data.token); // Update authentication state to true
      navigate('/'); // Navigate to the homepage after successful sign-up
    } catch (error) {
      setError('Account creation failed. Please try again.');
      console.error('Sign up failed', error?.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Username:</label>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      <button type="button" onClick={navigateToLogin}>Login</button> 
    </form>
  );
}

export default SignUpForm;
