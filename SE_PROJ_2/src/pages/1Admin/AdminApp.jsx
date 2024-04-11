import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavSidebar from '../../components/NavSidebar/NavSidebar';
import HowToUseA from './HowToUseA';
import ImportAndExport from './ImportAndExport';
import EditTheCourseTem from './EditTheCourseTem';
import SubjectManager from './SubjectManager';
import UserInfo from '../UserInfo/UserInfo';
import { IoMdHelpCircle, IoMdListBox, IoIosMailUnread, IoMdDocument, IoMdExit } from "react-icons/io";

const adminMenuItems = [
  { title: "วิธีใช้งาน", icon: IoMdHelpCircle, path: "/admin/howToUseA" },
  { title: "นำเข้า/ส่งออกข้อมูลแบบไฟล์", icon: IoMdListBox, path: "/admin/importAndExport" },
  { title: "จัดการรายวิชาที่เปิดสอน", icon: IoIosMailUnread, path: "/admin/editTheCourseTem" },
  { title: "จัดตารางสอน", icon: IoMdDocument, path: "/admin/subjectManager" },
  { title: "ลงชื่อออก", icon: IoMdExit, path: "/" }
];

const AdminApp = () => {
  return (
    <div className="admin-dashboard">
      <NavSidebar menuItems={adminMenuItems} />
      <div className="main-content">
        <Routes>
          <Route path="/admin/howToUseA" element={<HowToUseA />} />
          <Route path="/admin/importAndExport" element={<ImportAndExport />} />
          <Route path="/admin/editTheCourseTem" element={<EditTheCourseTem />} />
          <Route path="/admin/subjectManager" element={<SubjectManager />} />
          <Route path="/admin/userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;
