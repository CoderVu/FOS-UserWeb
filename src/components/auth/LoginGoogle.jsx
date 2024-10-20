import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../auth/gg.css';
const LoginGoogle = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
          localStorage.setItem('jwtToken', token);
          const response = await axios.get('https://pbl6-fastordersystem.onrender.com/api/v1/auth/user-info-google', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.data.success) {
            console.log('User data:', response.data.data);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/home');
    } else {
      fetchUserInfo();
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'https://pbl6-fastordersystem.onrender.com/oauth2/authorization/google';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Login with Google</h1>
      <button className="google-login-button" onClick={handleGoogleLogin}>
        <i className="fab fa-google"></i> Login with Google
      </button>
    </div>
  );
};

export default LoginGoogle;