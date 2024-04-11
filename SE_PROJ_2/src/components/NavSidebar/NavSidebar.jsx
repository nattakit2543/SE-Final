// NavSidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavSidebar.css'; 
import userImage from '../../assets/user.png';
import {
  IoMdHelpCircle,
  IoMdListBox,
  IoMdDocument,
  IoMdExit,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
  IoIosMailUnread,
} from "react-icons/io";

const SIDEBAR_WIDTH_EXPANDED = 250;
const SIDEBAR_WIDTH_COLLAPSED = 80;

const NavSidebar = ({ menuItems }) => {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [iconPosition, setIconPosition] = useState(SIDEBAR_WIDTH_EXPANDED);

  useEffect(() => {
    const newPosition = isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED - 15 : SIDEBAR_WIDTH_COLLAPSED - 15;
    setIconPosition(newPosition);
  }, [isSidebarExpanded]);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const getActiveMenuName = () => {
    const activeItem = menuItems.find(item => location.pathname.startsWith(item.path));
    return activeItem ? activeItem.title : "";
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
        <NavLink to="/userInfo" className="sidebar-header">
          <img src={userImage} alt="User" className="user-image" />
          <span className="username">Username</span>
        </NavLink>
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.path} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
            <item.icon className="menu-icon" />
            <span className="menu-title">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavSidebar;
