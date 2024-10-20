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
        return;
      }

      try {
        const response = await axios.get('https://pbl6-fastordersystem.onrender.com/api/v1/auth/user-info-google', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);
  const goToLogin = () => {
    navigate('/login');
  };

  const goToLogingg = () => {
    navigate('/login-google');
  };
  const gotoLogginFB = () => {
    navigate('/login-facebook');
  };

  const goToAllProducts = () => {
    navigate('/all-product');
  };

  const goToAllCartItemOfme = () => {
    navigate('/all-cart-item-of-me');
  };

  const goToAllOrder = () => {
    navigate('/all-order');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Redirect to login after logout
  };


  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToLogin}>Go to Login</button>
      <button onClick={goToLogingg}>Go to Login Google</button>
      <button onClick={gotoLogginFB}>Go to Login Facebookk</button>
      <button onClick={goToAllProducts}>Go to All Products</button>
      <button onClick={goToAllCartItemOfme}>Go to All Cart Items</button>
      <button onClick={goToAllOrder}>All Orders</button>
      <button onClick={handleLogout}>Logout</button>
      <h2>Home</h2>
      {userInfo ? (
        <div>
          <h2>User Info</h2>
          <p>Email: {userInfo.email}</p>
          <p>Full Name: {userInfo.fullName}</p>
          <p>Avatar: <img src={`data:image/png;base64,${userInfo.avatar}`} alt="Avatar" /></p>
          <p>Phone Number: {userInfo.phoneNumber}</p>
          <>Token: {localStorage.getItem('jwtToken')}</>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;