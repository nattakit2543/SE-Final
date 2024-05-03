import React, { useState, useEffect } from 'react';
import './NavSidebarT.css';
import userImage from '../../../assets/user.png';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdHelpCircle, IoMdListBox, IoMdDocument, IoMdExit, IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

const NavSidebarT = () => { 
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
            case "/teacher/userInfo":
                return "ข้อมูลส่วนตัว";
            case "/teacher/howToUseT":
                return "วิธีใช้งาน";
            case "/teacher/schTable":
                return "ตารางสอน";
            case "/teacher/reqSub":
                return "ยื่นคำร้อง";
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
                <NavLink to="/teacher/userInfo" className="sidebar-header">
                    <img src={userImage} alt="user" className="user-image" />
                    <span className="username">username</span>
                </NavLink>
                <NavLink to="/teacher/howToUseT" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdHelpCircle className="menu-icon" />
                    <span className="menu-title">วิธีใช้งาน</span>
                </NavLink>
                <NavLink to="/teacher/schTable" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdListBox className="menu-icon" />
                    <span className="menu-title">ตารางสอน</span>
                </NavLink>
                <NavLink to="/teacher/reqSub" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdDocument className="menu-icon" />
                    <span className="menu-title">ยื่นคำร้อง</span>
                </NavLink>
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdExit className="menu-icon" />
                    <span className="menu-title">ลงชื่อออก</span>
                </NavLink>
            </div>
        </div>
    );
};

export default NavSidebarT;
