import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HowToUseT from './HowToUseT';
import SchTable from './SchTable';
import ReqSub from './ReqSub';
import UserInfo from '../UserInfo/UserInfo';
import NavSidebarT from './layoutT/NavSidebarT';
import './TeacherApp.css'; 

const TeacherApp = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`teacher-dashboard ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      <NavSidebarT toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
      <div className="main-content">
        <Routes>
          <Route path="howToUseT" element={<HowToUseT />} />
          <Route path="schTable" element={<SchTable />} />
          <Route path="reqSub" element={<ReqSub />} />
          <Route path="userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherApp;
