import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        navigate('/home');
        return;
      }

      try {
        const response = await axios.get('https://pbl6-fastordersystem.onrender.com/api/v1/auth/user-info', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate('/home');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate('/login')}>Go to Login</button>
      <button onClick={() => navigate('/login-google')}>Login with Google</button>
      <button onClick={() => navigate('/login-facebook')}>Login with Facebook</button>
      <button onClick={() => navigate('/all-product')}>View All Products</button>
      <button onClick={() => navigate('/all-cart-item-of-me')}>View My Cart</button>
      <button onClick={() => navigate('/all-order')}>View Orders</button>
      <button onClick={handleLogout}>Logout</button>

      {userInfo ? (
        <div>
          <h2>User Info</h2>
          <p>Email: {userInfo.email}</p>
          <p>Full Name: {userInfo.fullName}</p>
          <p>
            Avatar: <img src={`data:image/png;base64,${userInfo.avatar}`} alt="Avatar" />
          </p>
          <p>Phone Number: {userInfo.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
