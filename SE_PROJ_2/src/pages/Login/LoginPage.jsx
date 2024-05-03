import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import KUlogo from '../../assets/LOGO_KU.png';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [role,setRole]= useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await login(email, password);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.get(`http://localhost:3100/forlogin/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
      const userData = response.data[0];
      setTeacherInfo(userData);
      insertTeacherInfo(userData);
      setRole(response.data[0].Role);
      navigate(response.data[0].Role === 'Admin' ? '/admin' : '/teacher/howToUseT');
      
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setTeacherInfo = (userData) => {
    setEmail(userData.Email);
    setPassword(userData.Password);
    // Assuming these are all properties of userData
    
  };

  const insertTeacherInfo = async (userData) => {
    const { ID, TeacherName, TeacherSurname, Phone, Email, Password, Major, Role } = userData;
    const url = `http://localhost:3100/forloginuserinfo/${ID}/${TeacherName}/${TeacherSurname}/${Phone}/${Email}/${Password}/${Major}/${Role}`;
    console.log(url);
    try {
      await axios.get(url);
    } catch (error) {
      console.error('Error inserting teacher info:', error);
    }
  };

  return (
    <div className="containerLogin">
      <form className="login-box" onSubmit={handleSubmit}>
        <img src={KUlogo} alt="Kasetsart University Logo" className="ku-logo" />
        <div className="username-section">
          <label htmlFor="email" className="email-label">Email</label>
          <input type="email" id="email" className="login-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password-section">
          <label htmlFor="password" className="password-label">Password</label>
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
