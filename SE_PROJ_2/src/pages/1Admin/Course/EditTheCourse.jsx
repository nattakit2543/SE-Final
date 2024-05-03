import React, { useState, useEffect } from "react";
import { IoIosEye, IoMdTrash, IoIosJournal } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./EditTheCourse.css";
import ConfirmDeletePopup from "../ComponentsAdmin/ConfirmDeletePopup";
import StatusPopup from "../ComponentsAdmin/StatusPopup";

const EditTheCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [currentCourseId, setCurrentCourseId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3100/api/courses")
            .then(response => response.json())
            .then(data => setCourses(data.map(item => ({ courseyear: item.CourseYear, name: `หลักสูตรปีการศึกษา ${item.CourseYear}` }))))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const handleDeleteCourse = () => {
        setIsPopupOpen(false);
        setStatus('processing');
        fetch(`http://localhost:3100/api/courses/${currentCourseId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                setCourses(prevCourses => prevCourses.filter(course => course.courseyear !== currentCourseId));
                setStatus('success');
                setTimeout(() => setStatus(null), 3000);
            }
        })
        .catch(error => {
            console.error('Error deleting course:', error);
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
        });
    };

    const openDeleteConfirm = (courseId) => {
        setCurrentCourseId(courseId);
        setIsPopupOpen(true);
    };

    return (
        <div className="edit-course-container">
            <table className="edit-course-table">
                <thead>
                    <tr>
                        <th><IoIosJournal className="edit-course-icon" /> หลักสูตร</th>
                        <th>ตัวดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(({ courseyear, name }) => (
                        <tr key={courseyear}>
                            <td>{name}</td>
                            <td>
                                <div className="icon-wrapper">
                                    <IoIosEye
                                        onClick={() => navigate(`edit-sub/${courseyear}`, { state: { curriculumYear: courseyear } })}
                                        className="edit-course-icon eye-icon"
                                        title="View"
                                    />
                                    <IoMdTrash
                                        onClick={() => openDeleteConfirm(courseyear)}
                                        className="edit-course-icon delete-icon"
                                        title="Delete"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <ConfirmDeletePopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={handleDeleteCourse}
                />
            )}
            {status && (
                <StatusPopup
                    status={status}
                    onClose={() => setStatus(null)}
                />
            )}
        </div>
    );
};

export default EditTheCourse;
