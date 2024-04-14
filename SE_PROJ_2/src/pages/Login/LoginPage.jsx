import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import KUlogo from '../../assets/LOGO_KU.png';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3100/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
      const data = response.data[0];
      if (data && data.Role) {
        setLoading(false);
        navigate(data.Role === 'admin' ? '/admin' : '/teacher');
      } else {
        setLoading(false);
        setError('Invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="containerLogin">
      <form className="login-box" onSubmit={handleSubmit}>
        <img src={KUlogo} alt="Kasetsart University Logo" className="ku-logo" />
        <div className="username-section">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="login-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password-section">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="login-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="buttons-container">
          <button type="submit" id="login-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;