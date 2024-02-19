// SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      // Update the URL to your actual sign-up endpoint
      const response = await axios.post('http://localhost:3000/signup', { username, email, password });
      console.log('Account created successfully', response.data);
      // Inside LoginForm.js and SignUpForm.js, after successful login/signup
      onAuthSuccess(response.data.token);

    } catch (error) {
      setError('Account creation failed. Please try again.');
      console.error('Sign up failed', error?.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Email:</label>
        // Example input field for the username in SignUpForm.js
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
    </form>
  );
}

export default SignUpForm;
