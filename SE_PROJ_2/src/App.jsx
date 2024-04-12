import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import AdminApp from './pages/1Admin/AdminApp';
import TeacherApp from './pages/2Teacher/TeacherApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/teacher/*" element={<TeacherApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
