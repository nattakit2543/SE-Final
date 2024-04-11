import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavSidebar from '../../components/NavSidebar/NavSidebar';
import HowToUseT from './HowToUseT';
import SchTable from './SchTable';
import ReqSub from './ReqSub';
import UserInfo from '../UserInfo/UserInfo';
import { IoMdHelpCircle, IoMdListBox, IoMdDocument, IoMdExit } from "react-icons/io";

const teacherMenuItems = [
  { title: "วิธีใช้งาน", icon: IoMdHelpCircle, path: "/teacher/howToUseT" },
  { title: "ตารางสอน", icon: IoMdListBox, path: "/teacher/schTable" },
  { title: "ยื่นคำร้อง", icon: IoMdDocument, path: "/teacher/reqSub" },
  { title: "ลงชื่อออก", icon: IoMdExit, path: "/" }
];

const TeacherApp = () => {
  return (
    <div className="teacher-dashboard">
      <NavSidebar menuItems={teacherMenuItems} />
      <div className="main-content">
        <Routes>
          <Route path="/teacher/howToUseT" element={<HowToUseT />} />
          <Route path="/teacher/schTable" element={<SchTable />} />
          <Route path="/teacher/reqSub" element={<ReqSub />} />
          <Route path="/teacher/userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherApp;
