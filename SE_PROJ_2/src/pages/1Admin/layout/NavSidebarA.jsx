import React, { useState, useEffect } from 'react';
import './NavSidebarA.css?v=1.1';
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

const NavSidebarA = () => {
    const location = useLocation();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [iconPosition, setIconPosition] = useState(250);

    useEffect(() => {
        const newPosition = isSidebarExpanded ? 235 : 65;
        setIconPosition(newPosition);
    }, [isSidebarExpanded]);

    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);


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
            <div className="navbar">
                <span className="navbar-title">{getActiveMenuName()}</span>
            </div>
            <div className="toggle-icon" style={{ left: `${iconPosition}px` }} onClick={toggleSidebar}>
                {isSidebarExpanded ? <IoIosArrowDropleftCircle size={30} /> : <IoIosArrowDroprightCircle size={30} />}
            </div>
            <div className={`sidebar ${isSidebarExpanded ? '' : 'collapsed'}`}>
                <NavLink to="/admin/userInfo" className="sidebar-header">
                    <img src={userImage} alt="user" className="user-image" />
                    <span className="username">username</span>
                </NavLink>
                <NavLink to="/admin/howToUseA" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdHelpCircle className="menu-icon" />
                    <span className="menu-title">วิธีใช้งาน</span>
                </NavLink>
                <NavLink to="/admin/importAndExport" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdListBox className="menu-icon" />
                    <span className="menu-title">นำเข้า/ส่งออกข้อมูลแบบไฟล์</span>
                </NavLink>
                <NavLink to="/admin/editTheCourseTem" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdDocument className="menu-icon" />
                    <span className="menu-title">จัดการรายวิชาที่เปิดสอน</span>
                </NavLink>
                <NavLink to="/admin/subjectManager" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdDocument className="menu-icon" />
                    <span className="menu-title">จัดตารางสอน</span>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdExit className="menu-icon" />
                    <span className="menu-title">ลงชื่อออก</span>
                </NavLink>
            </div>
        </div>
    );
};

export default NavSidebarA;
