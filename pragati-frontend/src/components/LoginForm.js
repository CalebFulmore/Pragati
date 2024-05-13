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
    console.log('Sending email:', email);  // Confirm email format
    console.log('Sending password:', password);  // Log the password being sent
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Login response:', response.data);  // Log response data
      localStorage.setItem('token', response.data.token);
      onAuthSuccess(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data);  // Detailed error from server
      setError('Login failed. Please check your credentials.');
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
