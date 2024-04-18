import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HowToUseA from './HowToUseA';
import ImportAndExport from './ImportAndExport';
import EditTheCourseTem from './EditTheCourseTem/EditTheCourseTem';
import SubjectManager from './SubjectManager';
import UserInfo from '../UserInfo/UserInfo';
import NavSidebarA from './layoutA/NavSidebarA';
import EditeProfile from '../UserInfo/EditeProfile';
import CheckRequests from './CheckRequests'; 
import Mana1 from './EditTheCourseTem/Manage';
import Mana2 from './EditTheCourseTem/Manage2';
import Mana3 from './EditTheCourseTem/Manage3';


import './AdminApp.css';

const AdminApp = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const logout = () => {
        sessionStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    return (
        <div className={`admin-dashboard ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <NavSidebarA toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded} logout={logout} />
            <div className="main-contentA">
                <Routes>
                    <Route path="howToUseA" element={<HowToUseA />} />
                    <Route path="importAndExport" element={<ImportAndExport />} />
                    <Route path="editTheCourseTem" element={<EditTheCourseTem />} />
                    <Route path="subjectManager" element={<SubjectManager />} />
                    <Route path="userInfo" element={<UserInfo />} />
                    <Route path="checkRequests" element={<CheckRequests />} />
                    <Route path="userInfo/editProfile" element={<EditeProfile />} />

                    <Route path="editTheCourseTem/Manage" element={<Mana1 />} />
                    <Route path="editTheCourseTem/Manage2" element={<Mana2 />} />
                    <Route path="editTheCourseTem/Manage3" element={<Mana3 />} />


                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;
