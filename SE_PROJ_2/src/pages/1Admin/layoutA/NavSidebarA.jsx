import React, { useState, useEffect } from 'react';
import './NavSidebarA.css'; 
import userImage from '../../../assets/user.png';
import { NavLink, useLocation } from 'react-router-dom';
import {
    IoMdHelpCircle,
    IoMdListBox,
    IoMdDocument,
    IoMdExit,
    IoIosArrowDroprightCircle,
    IoIosArrowDropleftCircle
} from "react-icons/io";

const NavSidebarA = ({ toggleSidebar, isSidebarExpanded }) => {
    const location = useLocation();
    const [iconPosition, setIconPosition] = useState(250);

    useEffect(() => {
        const newPosition = isSidebarExpanded ? 235 : 65; // Adjust icon position based on sidebar state
        setIconPosition(newPosition);
    }, [isSidebarExpanded]);

    const getActiveMenuName = () => {
        switch (location.pathname) {
            case "/admin/userInfo":
                return "ข้อมูลส่วนตัว";
            case "/admin/howToUseA":
                return "วิธีใช้งาน";
            case "/admin/importAndExport":
                return "นำเข้า/ส่งออกข้อมูลแบบไฟล์";
            case "/admin/editTheCourseTem":
                return "จัดการรายวิชาที่เปิดสอน";
            case "/admin/editTheCourse":
                return "แก้ไขรายวิชา";
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
                <span className="admin-navbar-title">{getActiveMenuName()}</span>
            </div>
            <div className="admin-toggle-icon" style={{ left: `${iconPosition}px` }} onClick={toggleSidebar}>
                {isSidebarExpanded ? <IoIosArrowDropleftCircle size={30} /> : <IoIosArrowDroprightCircle size={30} />}
            </div>
            <div className={`admin-sidebar ${isSidebarExpanded ? '' : 'collapsed'}`}>
                <NavLink to="/admin/userInfo" className="admin-sidebar-header">
                    <img src={userImage} alt="user" className="admin-user-image" />
                    <span className="admin-username">username</span>
                </NavLink>
                <NavLink to="/admin/howToUseA" className={({ isActive }) => isActive ? 'admin-menu-item active' : 'admin-menu-item'}>
                    <IoMdHelpCircle className="admin-menu-icon" />
                    <span className="admin-menu-title">วิธีใช้งาน</span>
                </NavLink>
                <NavLink to="/admin/importAndExport" className={({ isActive }) => isActive ? 'admin-menu-item active' : 'admin-menu-item'}>
                    <IoMdListBox className="admin-menu-icon" />
                    <span className="admin-menu-title">นำเข้า/ส่งออกข้อมูลแบบไฟล์</span>
                </NavLink>
                <NavLink to="/admin/editTheCourseTem" className={({ isActive }) => isActive ? 'admin-menu-item active' : 'admin-menu-item'}>
                    <IoMdDocument className="admin-menu-icon" />
                    <span className="admin-menu-title">จัดการรายวิชาที่เปิดสอน</span>
                </NavLink>
                <NavLink to="/admin/subjectManager" className={({ isActive }) => isActive ? 'admin-menu-item active' : 'admin-menu-item'}>
                    <IoMdDocument className="admin-menu-icon" />
                    <span className="admin-menu-title">จัดตารางสอน</span>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => isActive ? 'admin-menu-item active' : 'admin-menu-item'}>
                    <IoMdExit className="admin-menu-icon" />
                    <span className="admin-menu-title">ลงชื่อออก</span>
                </NavLink>
            </div>
        </div>
    );
};

export default NavSidebarA;
