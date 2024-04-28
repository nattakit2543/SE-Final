import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HowToUseA from '../HowToUse/HowToUseA';
import ImportAndExport from './ImportAndExport/ImportAndExport';
import EditTheCourseTem from './EditTheCourseTem/EditTheCourseTem';
import SubjectManager from './SubjectManager/SubjectManager';
import UserInfo from '../UserInfo/UserInfo';
import NavSidebarA from './layoutA/NavSidebarA';
import EditeProfile from '../UserInfo/EditeProfile';
import CheckRequests from './CheckRequests/CheckRequests'; 
import Manage from './EditTheCourseTem/Manage';
import EditTheCourse from './Course/EditTheCourse';
import Editsub from './Course/EditSub';

import './AdminApp.css';

const AdminApp = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const logout = () => {
        sessionStorage.removeItem("userToken");
        navigate("/login");
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
                    <Route path="editTheCourseTem/Manage" element={<Manage />} />
                    <Route path="editTheCourse" element={<EditTheCourse />} />
                    <Route path="editTheCourse/edit-sub" element={<Editsub />} />
                    {/*<Route path="edit-sub/:courseId" element={<Editsub />} />*/}
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;
