import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../auth/gg.css';

const LoginGoogle = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://food-app-gvbhgyfabjcthbhd.southeastasia-01.azurewebsites.net/oauth2/authorization/google';
  };

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
