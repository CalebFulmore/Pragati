import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added to manage error state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message on new submission
    try {
      // Update the URL to your actual login endpoint
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Login successful', response.data);
      // Here you might want to redirect the user or save the auth token
      // Inside LoginForm.js and SignUpForm.js, after successful login/signup
      onAuthSuccess(response.data.token);

    } catch (error) {
      // If there's an error, update the state so you can display it
      setError('Login failed. Please check your credentials.');
      console.error('Login failed', error?.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>} {/* Display any error message */}
      <div>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
