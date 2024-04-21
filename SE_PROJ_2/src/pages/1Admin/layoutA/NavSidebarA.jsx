import React, { useState, useEffect } from "react";
import "./NavSidebarA.css";
import userImage from "../../../assets/user.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  IoMdHelpCircle,
  IoMdListBox,
  IoIosListBox,
  IoMdDocument,
  IoMdExit,
  IoMdGrid,
  IoMdMailUnread,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import axios from "axios";

const NavSidebarA = ({ toggleSidebar, isSidebarExpanded, logout }) => {
  const location = useLocation();
  const semester = location.state?.semester;
  const curriculumName = location.state?.curriculumName;

  const [iconPosition, setIconPosition] = useState(250);
  const [idTeacher, setidTeacher] = useState();

  useEffect(() => {
    const newPosition = isSidebarExpanded ? 235 : 65;
    setIconPosition(newPosition);
    userinfo();
  }, [isSidebarExpanded]);

  const getActiveMenuName = () => {
    switch (location.pathname) {
      case "/admin/checkRequests":
        return "ตรวจสอบคำร้อง";
      case "/admin/userInfo":
        return "ข้อมูลส่วนตัว";
      case "/admin/howToUseA":
        return "วิธีใช้งาน";
      case "/admin/importAndExport":
        return "นำเข้า/ส่งออกข้อมูลแบบไฟล์";
      case "/admin/editTheCourseTem":
        return "จัดการรายวิชาที่เปิดสอน";
      case "/admin/editTheCourse":
        return "ข้อมูลหลักสูตร";
      case "/admin/subjectManager":
        return "จัดตารางสอน";
      case "/":
        return "ลงชื่อออก";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="admin-navbar">
        <span className="admin-navbar-title">
          {curriculumName || semester || getActiveMenuName()}
        </span>
      </div>
      <div
        className="admin-toggle-icon"
        style={{ left: `${iconPosition}px` }}
        onClick={toggleSidebar}
      >
        {isSidebarExpanded ? (
          <IoIosArrowDropleftCircle size={30} />
        ) : (
          <IoIosArrowDroprightCircle size={30} />
        )}
      </div>
      <div className={`admin-sidebar ${isSidebarExpanded ? "" : "collapsed"}`}>
        <NavLink to="userInfo" className="admin-sidebar-header">
          <img src={userImage} alt="user" className="admin-user-image" />
          <span className="admin-username">username</span>
        </NavLink>
        <NavLink
          to="howToUseA"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdHelpCircle className="admin-menu-icon" />
          <span className="admin-menu-title">วิธีใช้งาน</span>
        </NavLink>
        <NavLink
          to="importAndExport"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdListBox className="admin-menu-icon" />
          <span className="admin-menu-title">นำเข้า/ส่งออกข้อมูลแบบไฟล์</span>
        </NavLink>
        <NavLink
          to="editTheCourseTem"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdDocument className="admin-menu-icon" />
          <span className="admin-menu-title">จัดการรายวิชาที่เปิดสอน</span>
        </NavLink>
        <NavLink
          to="editTheCourse"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoIosListBox className="admin-menu-icon" />
          <span className="admin-menu-title">ข้อมูลหลักสูตร</span>
        </NavLink>
        <NavLink
          to="subjectManager"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdGrid className="admin-menu-icon" />
          <span className="admin-menu-title">จัดตารางสอน</span>
        </NavLink>
        <NavLink
          to="checkRequests"
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdMailUnread className="admin-menu-icon" />
          <span className="admin-menu-title">ตรวจสอบคำร้อง</span>
        </NavLink>
        <NavLink
          to="/"
          onClick={() => logout(idTeacher)}
          className={({ isActive }) =>
            isActive ? "admin-menu-item active" : "admin-menu-item"
          }
        >
          <IoMdExit className="admin-menu-icon" />
          <span className="admin-menu-title">ลงชื่อออก</span>
        </NavLink>
      </div>
    </div>
  );

  async function logout(idTeacher) {
    const url = `http://localhost:3100/forlogout/${idTeacher}`;
    console.log(url);
    axios.get(url).then((Response) => {});
  }
  async function userinfo() {
    const url = `http://localhost:3100/userinfo`;
    axios.get(url).then((Response) => {
      setidTeacher(Response.data[0].idTeacher);
    });
  }
};

export default NavSidebarA;
