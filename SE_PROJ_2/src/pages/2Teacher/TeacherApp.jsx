import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HowToUseT from './HowToUseT';
import SchTable from './SchTable';
import ReqSub from './ReqSub';
import UserInfo from '../UserInfo/UserInfo';
import NavSidebarT from './layout/NavSidebarT';

const TeacherApp = () => {
  return (
    <div className="teacher-dashboard">
      <NavSidebarT />
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
