import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HowToUseT from "./HowToUseT";
import SchTable from "./ScheduleTable/SchTable";
import ReqSub from "./RequestSubmission/ReqSub";
import UserInfo from "../UserInfo/UserInfo";
import EditeProfile from "../UserInfo/EditeProfile";
import NavSidebarT from "./layoutT/NavSidebarT";
import "./TeacherApp.css";

const TeacherApp = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  return (
    <div
      className={`teacher-dashboard ${
        isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <NavSidebarT
        toggleSidebar={toggleSidebar}
        isSidebarExpanded={isSidebarExpanded}
        logout={logout}
      />
      <div className="main-content">
        <Routes>
          <Route path="howToUseT" element={<HowToUseT />} />
          <Route path="schTable" element={<SchTable />} />
          <Route path="reqSub" element={<ReqSub />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="userInfo/editProfile" element={<EditeProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherApp;
