import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HowToUseA from './HowToUseA';
import ImportAndExport from './ImportAndExport';
import EditTheCourseTem from './EditTheCourseTem';
import SubjectManager from './SubjectManager';
import UserInfo from '../UserInfo/UserInfo';
import NavSidebarA from './layout/NavSidebarA';
import './AdminApp.css';

const AdminApp = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    console.log("Sidebar Toggled:", !isSidebarExpanded); 
  };

  return (
    <div className={`admin-dashboard ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      <NavSidebarA toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
      <div className="main-contentA">
        <Routes>
          <Route path="howToUseA" element={<HowToUseA />} />
          <Route path="importAndExport" element={<ImportAndExport />} />
          <Route path="editTheCourseTem" element={<EditTheCourseTem />} />
          <Route path="subjectManager" element={<SubjectManager />} />
          <Route path="userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;
