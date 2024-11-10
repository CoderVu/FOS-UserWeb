import React from 'react';
import '../auth/gg.css';
const LoginFacebook = () => {
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  };

  return (
    <div>
      <button className="google-login-button" onClick={handleFacebookLogin}>
        <i className="fab fa-facebook"></i> Login with Facebook
      </button>
    </div>
  );
};

export default LoginFacebook;
