import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavSidebar from '../../components/NavSidebar/NavSidebar';
import {
  IoMdHelpCircle,
  IoMdListBox,
  IoMdDocument,
  IoMdExit,
} from "react-icons/io";

import HowToUseT from './HowToUseT'; 
import SchTable from './SchTable'; 
import ReqSub from './ReqSub'; 
import UserInfo from '../UserInfo/UserInfo'; 
import LoginPage from '../Login/LoginPage'; 

const teacherMenuItems = [
  { title: "วิธีใช้งาน", icon: IoMdHelpCircle, path: "/howToUseT" },
  { title: "ตารางสอน", icon: IoMdListBox, path: "/schTable" },
  { title: "ยื่นคำร้อง", icon: IoMdDocument, path: "/reqSub" },
  { title: "ข้อมูลส่วนตัว", icon: IoMdDocument, path: "/userInfo" },
  { title: "ลงชื่อออก", icon: IoMdExit, path: "/" }
];

const TeacherApp = () => {
  return (
    <Router>
      <div className="teacher-dashboard">
        <NavSidebar menuItems={teacherMenuItems} />
        <div className="main-content">
          <Routes>
            <Route path="/howToUseT" element={<HowToUseT />} />
            <Route path="/schTable" element={<SchTable />} />
            <Route path="/reqSub" element={<ReqSub />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default TeacherApp;
