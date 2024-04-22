import React, { useState } from "react";
import { IoMdCreate, IoIosEye, IoMdTrash, IoIosJournal } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./EditTheCourse.css";
import ConfirmDeletePopup from "./ConfirmDeletePopup"; 

const EditTheCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    { id: 1, name: "Academic year 2017 curriculum" },
    { id: 2, name: "Academic year 2018 curriculum" },
    { id: 3, name: "Academic year 2019 curriculum" },
    { id: 4, name: "Academic year 2020 curriculum" },
    { id: 5, name: "Academic year 2021 curriculum" },
    { id: 6, name: "Academic year 2022 curriculum" },
    { id: 7, name: "Academic year 2023 curriculum" },
    { id: 8, name: "Academic year 2024 curriculum" },
    { id: 9, name: "Academic year 2025 curriculum" },
    { id: 10, name: "Academic year 2026 curriculum" },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const handleDeleteCourse = () => {
    const updatedCourses = courses.filter(course => course.id !== currentCourseId);
    setCourses(updatedCourses);
    setIsPopupOpen(false); 
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
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>
                <IoIosEye
                  onClick={() => navigate(`edit-sub`, { state: { curriculumName: course.name } })}
                  className="edit-course-icon eye-icon"
                  title="View"
                />
                <IoMdTrash
                  onClick={() => openDeleteConfirm(course.id)}
                  className="edit-course-icon delete-icon"
                  title="Delete"
                />
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
    </div>
  );
};

export default EditTheCourse;
