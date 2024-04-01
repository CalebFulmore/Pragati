import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Login successful', response.data);
      onAuthSuccess(response.data.token);
      navigate('/'); // Navigate to the homepage after successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed', error?.response?.data);
    }
  };

  const navigateToSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={navigateToSignUp}>Create Account</button>
    </form>
  );
}

export default LoginForm;
