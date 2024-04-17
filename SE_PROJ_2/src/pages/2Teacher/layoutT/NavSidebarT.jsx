import React, { useState, useEffect } from 'react';
import './NavSidebarT.css';
import userImage from '../../../assets/user.png';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdHelpCircle, IoMdListBox, IoMdDocument, IoMdExit, IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import axios from 'axios';


const NavSidebarT = ({ toggleSidebar, isSidebarExpanded, logout }) => { 
    const location = useLocation();
    const [iconPosition, setIconPosition] = useState(250); 
    const [idTeacher, setidTeacher] = useState(); 
    
    useEffect(() => {
        const newPosition = isSidebarExpanded ? 235 : 65; 
        setIconPosition(newPosition);
        userinfo();
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
                    <span className="username">username</span>
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
                <NavLink to="/" onClick={() => logout(idTeacher)} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
                    <IoMdExit className="menu-icon" />
                    <span className="menu-title">ลงชื่อออก</span>
                </NavLink>
            </div>
        </div>
    );

    async function logout (idTeacher){
        const url = `http://localhost:3100/forlogout/${idTeacher}`;
        console.log(url)
        axios.get(url).then((Response)=>{

        })
    }
    async function userinfo (){
        const url = `http://localhost:3100/userinfo`;
        axios.get(url).then((Response)=>{
            setidTeacher(Response.data[0].idTeacher)
            
        })
    }
    
};

export default NavSidebarT;