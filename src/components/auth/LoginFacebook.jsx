import React from 'react';

const LoginFacebook = () => {
  const handleFacebookLogin = () => {
    window.location.href = 'https://pbl6-fastordersystem.onrender.com/oauth2/authorization/facebook';
  };

  return (
    <div>
      <h1>Login with Facebook</h1>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default LoginFacebook;
