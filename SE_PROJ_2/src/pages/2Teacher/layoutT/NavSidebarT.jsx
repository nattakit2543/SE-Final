import React, { useState, useEffect } from 'react';
import './NavSidebarT.css';
import userImage from '../../../assets/user.png';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdHelpCircle, IoMdListBox, IoMdDocument, IoMdExit, IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import axios from 'axios';


const NavSidebarT = ({ toggleSidebar, isSidebarExpanded, logout }) => { 
    const location = useLocation();
    const [iconPosition, setIconPosition] = useState(250); 
    const [idTeacher, setidTeacher] = useState({}); 
    
    useEffect(() => {
        userinfo();
        const newPosition = isSidebarExpanded ? 235 : 65; 
        setIconPosition(newPosition);
        
    }, [isSidebarExpanded]); 

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
                <NavLink to="userInfo" className="sidebar-header">
                    <img src={userImage} alt="user" className="user-image" />
                    <p className="username">{idTeacher.TeacherName}</p>
                </NavLink>
                <NavLink to="howToUseT" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdHelpCircle className="menu-icon" />
                    <span className="menu-title">วิธีใช้งาน</span>
                </NavLink>
                <NavLink to="schTable" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdListBox className="menu-icon" />
                    <span className="menu-title">ตารางสอน</span>
                </NavLink>
                <NavLink to="reqSub" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdDocument className="menu-icon" />
                    <span className="menu-title">ยื่นคำร้อง</span>
                </NavLink>
                <NavLink to="/" onClick={() => logout(idTeacher.idTeacher)} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'} >
                    <IoMdExit className="menu-icon" />
                    <span className="menu-title">ลงชื่อออก</span>
                </NavLink>
            </div>
        </div>
    );


    async function logout(id) {
        console.log(id)
        var url = "http://localhost:3100/forlogout/" + id;
        
        try {
            await axios.get(url);
        } catch (error) {
            console.log("error:", error);
        }
    }

    async function userinfo() {
        let retries = 0;
        const maxRetries = 5; // Maximum number of retries
        const delay = 2000; // Delay between retries in milliseconds
    
        while (retries < maxRetries) {
            try {
                const response = await axios.get("http://localhost:3100/userinfo");
                console.log(response.data[0]);
                if (response.data.length > 0) {
                    setidTeacher(response.data[0]);
                    console.log(response.data[0]);
                    break; // Break out of the loop if data is received
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
    
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the delay
            retries++;
        }
    
        if (retries === maxRetries) {
            console.log("Max retries reached. Failed to fetch data.");
        }
    }
    
};

export default NavSidebarT;