import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateOnAuth({ isAuthenticated }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Auth State Changed: ", isAuthenticated); // Log the authentication state
    if (isAuthenticated) {
      console.log("Navigating to home page"); // Confirm navigation intent
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return null; // This component does not render anything
}

export default NavigateOnAuth;
