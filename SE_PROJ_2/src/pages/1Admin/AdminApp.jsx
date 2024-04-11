import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavSidebar from '../../components/NavSidebar/NavSidebar';
import {
  IoMdHelpCircle,
  IoMdListBox,
  IoMdDocument,
  IoMdExit,
  IoIosMailUnread,
} from "react-icons/io";

import HowToUseA from './HowToUseA'; 
import ImportAndExport from './ImportAndExport'; 
import EditTheCourseTem from './EditTheCourseTem'; 
import SubjectManager from './SubjectManager'; 
import UserInfo from '../UserInfo/UserInfo'; 
import LoginPage from '../Login/LoginPage'; 

const adminMenuItems = [
  { title: "วิธีใช้งาน", icon: IoMdHelpCircle, path: "/howToUseA" },
  { title: "นำเข้า/ส่งออกข้อมูลแบบไฟล์", icon: IoMdListBox, path: "/importAndExport" },
  { title: "จัดการรายวิชาที่เปิดสอน", icon: IoIosMailUnread, path: "/editTheCourseTem" },
  { title: "จัดตารางสอน", icon: IoMdDocument, path: "/subjectManager" },
  { title: "ข้อมูลส่วนตัว", icon: IoMdDocument, path: "/userInfo" },
  { title: "ลงชื่อออก", icon: IoMdExit, path: "/" }
];

const AdminApp = () => {
  return (
    <Router>
      <div className="admin-dashboard">
        <NavSidebar menuItems={adminMenuItems} />
        <div className="main-content">
          <Routes>
            <Route path="/howToUseA" element={<HowToUseA />} />
            <Route path="/importAndExport" element={<ImportAndExport />} />
            <Route path="/editTheCourseTem" element={<EditTheCourseTem />} />
            <Route path="/subjectManager" element={<SubjectManager />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminApp;
