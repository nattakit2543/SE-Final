import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCreate, IoIosTrash, IoIosAddCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import ConfirmDeletePopup from "./ConfirmDeletePopup"; 
import "./EditSub.css";

const EditSub = () => {
  const navigate = useNavigate();
  const initialCourseDetails = {
    2017: {
      term1: [
        {
          course_code: "CS101",
          course_name_en: "Introduction to Computer Science",
          course_name_th: "แนะนำการเรียนรู้คอมพิวเตอร์",
          credits: "3",
          basic_subject: "true",
        },
      ],
      term2: [
        {
          course_code: "CS106",
          course_name_en: "Software Engineering",
          course_name_th: "วิศวกรรมซอฟต์แวร์",
          credits: "3",
          basic_subject: "false",
        },
      ],
    },
  };

  const [courseDetails, setCourseDetails] = useState(initialCourseDetails);
  const [editMode, setEditMode] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleEdit = (term, index) => {
    setEditMode({ [`${term}-${index}`]: !editMode[`${term}-${index}`] });
  };

  const handleEditChange = (e, term, index) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = type === "checkbox" ? (checked ? "true" : "false") : value;

    const updatedCourses = courseDetails["2017"][term].map((course, idx) => {
      if (idx === index) {
        return { ...course, [name]: formattedValue };
      }
      return course;
    });

    setCourseDetails({
      ...courseDetails,
      2017: { ...courseDetails["2017"], [term]: updatedCourses },
    });
  };

  const handleAddCourse = (term) => {
    const newCourse = {
      course_code: "",
      course_name_en: "",
      course_name_th: "",
      credits: "",       
      basic_subject: "",
    };
    const updatedCourses = [...courseDetails["2017"][term], newCourse];
    setCourseDetails({
      ...courseDetails,
      2017: { ...courseDetails["2017"], [term]: updatedCourses },
    });
  };

  const openPopup = (term, index) => {
    setCurrentTerm(term);
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteCourse = () => {
    const updatedCourses = courseDetails["2017"][currentTerm].filter((_, idx) => idx !== currentIndex);
    setCourseDetails({
      ...courseDetails,
      2017: { ...courseDetails["2017"], [currentTerm]: updatedCourses },
    });
    closePopup();
  };

  return (
    <div className="course-details-container">
      {Object.entries(courseDetails["2017"]).map(([term, courses], termIndex) => (
        <div key={termIndex} className="term-section">
          <h2>Year 1, Term {termIndex + 1}</h2>
          <table className="course-details-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name (EN)</th>
                <th>Course Name (TH)</th>
                <th>Credits</th>
                <th>Basic Subject</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={`${term}-${index}`}>
                  <td>{editMode[`${term}-${index}`] ? <input type="text" name="course_code" value={course.course_code} onChange={(e) => handleEditChange(e, term, index)} /> : course.course_code}</td>
                  <td>{editMode[`${term}-${index}`] ? <input type="text" name="course_name_en" value={course.course_name_en} onChange={(e) => handleEditChange(e, term, index)} /> : course.course_name_en}</td>
                  <td>{editMode[`${term}-${index}`] ? <input type="text" name="course_name_th" value={course.course_name_th} onChange={(e) => handleEditChange(e, term, index)} /> : course.course_name_th}</td>
                  <td>{editMode[`${term}-${index}`] ? <input type="text" name="credits" value={course.credits} onChange={(e) => handleEditChange(e, term, index)} /> : course.credits}</td>
                  <td>
                    {editMode[`${term}-${index}`] ? (
                      <input
                        type="checkbox"
                        name="basic_subject"
                        checked={course.basic_subject === "true"}
                        onChange={(e) => handleEditChange(e, term, index)}
                      />
                    ) : (
                      course.basic_subject === "true" ? "Yes" : "No"
                    )}
                  </td>
                  <td className="edit-delete-buttons">
                    <button className="edit-button" onClick={() => toggleEdit(term, index)}><IoMdCreate /></button>
                    <button className="delete-button" onClick={() => openPopup(term, index)}><IoIosTrash /></button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  <button className="add-course-button" onClick={() => handleAddCourse(term)}><IoIosAddCircle/></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <ConfirmDeletePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onConfirm={handleDeleteCourse}
      />
      <button className="back-button" onClick={() => navigate(-1)}><IoArrowBackCircle /> </button>
    </div>
  );
};

export default EditSub;
