import React, { useEffect, useState } from "react";
import { IoIosEye, IoMdTrash, IoIosJournal } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./EditTheCourse.css";
import ConfirmDeletePopup from "../ComponentsAdmin/ConfirmDeletePopup";
import StatusPopup from "../ComponentsAdmin/StatusPopup";
import axios from 'axios';

const EditTheCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  
  useEffect(() => {
    getCourseWithRetry();
  }, []);

  const handleDeleteCourse = () => {
    setIsPopupOpen(false);
    setStatus('processing');
    setTimeout(() => {
      delCourseWithRetry(currentCourseId);
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    }, 2000);
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
            <th><IoIosJournal className="edit-course-icon" /> Curriculum Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses ? 
            courses.map((item, index) => (
              <tr key={index}>
                <td>{item.CourseYear}</td>
                <td>
                  <div className="icon-wrapper">
                    <IoIosEye
                      onClick={() => navigate(`edit-sub`, { state: { curriculumName: item, courseYear: item.CourseYear } })}
                      className="edit-course-icon eye-icon"
                      title="View"
                    />
                    <IoMdTrash
                      onClick={() => openDeleteConfirm(item.CourseYear)}
                      className="edit-course-icon delete-icon"
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            )) 
            : 
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          }
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

  async function getCourseWithRetry(attempt = 1) {
    const url = `http://localhost:3100/course`;
    try {
      const response = await axios.get(url);
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      if (attempt <= 3) {
        console.log(`Retrying... Attempt ${attempt}`);
        setTimeout(() => getCourseWithRetry(attempt + 1), 2000); // Retry after 2 seconds
      }
    }
  }

  async function delCourseWithRetry(courseYear, attempt = 1) {
    const url = `http://localhost:3100/deletecourse/` + courseYear;
    try {
      await axios.get(url);
    } catch (error) {
      console.log("Error deleting course:", error);
      if (attempt <= 3) {
        console.log(`Retrying... Attempt ${attempt}`);
        setTimeout(() => delCourseWithRetry(courseYear, attempt + 1), 2000); // Retry after 2 seconds
      }
    }
  }
};

export default EditTheCourse;
