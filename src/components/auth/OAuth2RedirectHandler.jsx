import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Current URL:', window.location.href); // Kiểm tra URL đầy đủ
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log("params", params);
  
    if (token) {
      localStorage.setItem('jwtToken', token);
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate, location]);
  

  return <p>Redirecting...</p>;
};

export default OAuth2RedirectHandler;
