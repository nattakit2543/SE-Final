import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCreate, IoIosTrash, IoIosAddCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import ConfirmDeletePopup from "../ComponentsAdmin/ConfirmDeletePopup";
import StatusPopup from "../ComponentsAdmin/StatusPopup";
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
          basic_subject: "Yes",
        },
      ],
      term2: [
        {
          course_code: "CS106",
          course_name_en: "Software Engineering",
          course_name_th: "วิศวกรรมซอฟต์แวร์",
          credits: "3",
          basic_subject: "No",
        },
      ],
    },
  };

  const [courseDetails, setCourseDetails] = useState(initialCourseDetails);
  const [editMode, setEditMode] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  const toggleEdit = (term, index) => {
    setEditMode(prev => ({ ...prev, [`${term}-${index}`]: !prev[`${term}-${index}`] }));
  };

  const handleEditChange = (e, term, index) => {
    const { name, value } = e.target;
    setCourseDetails(prevDetails => {
      const updatedCourses = prevDetails["2017"][term].map((course, idx) => {
        if (idx === index) {
          return { ...course, [name]: value };
        }
        return course;
      });

      return {
        ...prevDetails,
        2017: { ...prevDetails["2017"], [term]: updatedCourses },
      };
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
    setCourseDetails(prevDetails => {
      const updatedCourses = [...prevDetails["2017"][term], newCourse];
      return {
        ...prevDetails,
        2017: { ...prevDetails["2017"], [term]: updatedCourses },
      };
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
    setStatus('processing');
    closePopup();
    setTimeout(() => {
      setCourseDetails(prevDetails => {
        const updatedCourses = prevDetails["2017"][currentTerm].filter((_, idx) => idx !== currentIndex);
        return {
          ...prevDetails,
          2017: { ...prevDetails["2017"], [currentTerm]: updatedCourses },
        };
      });
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    }, 2000);
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
                  <td>{editMode[`${term}-${index}`] ? <input type="text" name="basic_subject" value={course.basic_subject} onChange={(e) => handleEditChange(e, term, index)} /> : course.basic_subject}</td>
                  <td className="edit-delete-buttons">
                    <button className="edit-button" onClick={() => toggleEdit(term, index)}><IoMdCreate /></button>
                    <button className="delete-button" onClick={() => openPopup(term, index)}><IoIosTrash /></button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  <button className="add-course-button" onClick={() => handleAddCourse(term)}><IoIosAddCircle /></button>
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
      {status && (
        <StatusPopup
          status={status}
        />
      )}
      <button className="back-button" onClick={() => navigate(-1)}><IoIosArrowDropleftCircle /></button>
    </div>
  );
};

export default EditSub;
