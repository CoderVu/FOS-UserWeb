import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginFacebook = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/v1/auth/user-info-facebook');
        if (response.data.success) {
          // Save user data in localStorage
          localStorage.setItem('user', JSON.stringify(response.data.data));
          console.log('User data:', response.data.data);
          // Navigate to the Home component
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Check if user is already authenticated
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/home'); // Navigate directly if user is authenticated
    } else {
      fetchUserInfo();
    }
  }, [navigate]);

  const handleFacebook = () => {
    // Navigate to the Facebook OAuth2 authentication page
    window.location.href = 'https://pbl6-fastordersystem.onrender.com/oauth2/authorization/facebook';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Login with Facebook</h1>
      <button onClick={handleFacebook}>Login with Facebook</button>
    </div>
  );
};

export default LoginFacebook;
