import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import KUlogo from '../../assets/LOGO_KU.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // จำลองการยืนยันตัวตนสำหรับ Admin และ Teacher
    if (username === "admin" && password === "123") {
      // ถ้าเป็น Admin ให้นำทางไปยังหน้า AdminApp
      navigate('/howToUseA');
    } else if (username === "teacher" && password === "123") {
      // ถ้าเป็น Teacher ให้นำทางไปยังหน้า TeacherApp
      navigate('/howToUseT');
    } else {
      // ถ้าข้อมูลไม่ถูกต้อง แสดงข้อความแจ้งเตือน
      alert('Invalid username or password');
    }
  };

  return (
    <div className="containerLogin">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={KUlogo} alt="Kasetsart University Logo" className="ku-logo" />
        <div className="username-section">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-section">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-container">
          <button type="submit" id="login-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
