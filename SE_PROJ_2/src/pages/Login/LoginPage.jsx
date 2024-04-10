import React from 'react';
import './LoginPage.css';
import KUlogo from '../../assets/LOGO_KU.png';
import GoogleLogo from '../../assets/GoogleLogo.png';

const LoginPage = () => {
  return (
    <div className="containerLogin">
      <form className="login-box">
        <img src={KUlogo} alt="Kasetsart University Logo" className="ku-logo" />
        <div className="username-section">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="password-section">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
          />
        </div>
        <div className="buttons-container">
          <button type="submit" id="login-button">Login</button>
          <button type="button" id="google-login-button">
            <img src={GoogleLogo} alt="Google Sign-In" />
          </button>
        </div>
        <div className="error-message"></div>
      </form>
    </div>
  );
};

export default LoginPage;
