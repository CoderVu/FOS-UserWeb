import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../utils/ApiFunctions.js";

const Login = () => {
  const [numberPhone, setNumberPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = { numberPhone, password };
      const response = await loginUser(loginData);
      if (response && response.data && response.data.token) {
        console.log('Token:', response.data.token);
        // Lưu trữ thông tin người dùng trong localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Chuyển hướng về trang chủ
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={numberPhone}
            onChange={(e) => setNumberPhone(e.target.value)}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;