import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCreate, IoIosTrash, IoIosAddCircle, IoIosSave, IoIosArrowDropleftCircle } from "react-icons/io";
import ConfirmDeletePopup from "../ComponentsAdmin/ConfirmDeletePopup";
import StatusPopup from "../ComponentsAdmin/StatusPopup";
import "./EditSub.css";

const EditSub = () => {
  const navigate = useNavigate();
  const { courseyear } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [editMode, setEditMode] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3100/api/subjects/${courseyear}`)
      .then(response => response.json())
      .then(data => {
        const groupedByYearAndTerm = data.reduce((acc, curr) => {
          const yearTerm = `ระดับชั้นปีที่ ${curr.StudentGrade}, ภาคการเรียนที่ ${curr.Semester}`;
          if (!acc[yearTerm]) {
            acc[yearTerm] = [];
          }
          acc[yearTerm].push(curr);
          return acc;
        }, {});
        setCourseDetails(groupedByYearAndTerm);
      })
      .catch(error => console.error('Error fetching subjects:', error));
  }, [courseyear]);

  const toggleEdit = (term, index) => {
    setEditMode(prev => ({ ...prev, [`${term}-${index}`]: !prev[`${term}-${index}`] }));
  };

  const handleEditChange = (e, term, index) => {
    const { name, value } = e.target;
    setCourseDetails(prevDetails => {
      const updatedCourses = prevDetails[term].map((course, idx) => {
        if (idx === index) {
          return { ...course, [name]: value };
        }
        return course;
      });
      return { ...prevDetails, [term]: updatedCourses };
    });
  };

  const handleAddCourse = (term) => {
    const [studentGrade, semester] = term.split(", ");
    const newCourse = {
      SubjectCode: "",
      SubjectNameEnglish: "",
      SubjectName: "",
      Credits: "",
      Preq: "",
      Major: "",
      Type: "",
      CourseYear: courseyear,
      StudentGrade: studentGrade.replace("ระดับชั้นปีที่ ", ""),
      Semester: semester.replace("ภาคการเรียนที่ ", "")
    };
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [term]: [...prevDetails[term], newCourse]
    }));
  };

  const handleSaveNewCourse = (term, index) => {
    const course = courseDetails[term][index];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...course,
        CourseYear: courseyear,
        StudentGrade: term.split(',')[0].replace('ระดับชั้นปีที่ ', '').trim(),
        Semester: term.split(',')[1].replace('ภาคการเรียนที่ ', '').trim()
      })
    };

    fetch(`http://localhost:3100/api/subjects/insert`, requestOptions)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Insert success:', data);
        toggleEdit(term, index);
        setStatus({ type: 'success', message: 'Data saved successfully!' });
        setTimeout(() => setStatus(null), 3000);
      })
      .catch(error => {
        console.error('Error during insertion:', error);
        setStatus({ type: 'error', message: 'Saving failed. Please try again.' });
        setTimeout(() => setStatus(null), 3000);
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
    const course = courseDetails[currentTerm][currentIndex];
    closePopup();
    if (course && course.SubjectCode) {
      setStatus({ type: 'processing', message: 'Deleting...' });
      const url = `http://localhost:3100/api/subjects/delete/${course.SubjectCode}`;

      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete the course');
          return response.json();
        })
        .then(() => {
          console.log('Deletion successful:', course);
          setCourseDetails(prevDetails => {
            const updatedCourses = prevDetails[currentTerm].filter((_, idx) => idx !== currentIndex);
            return { ...prevDetails, [currentTerm]: updatedCourses };
          });
          setStatus({ type: 'success', message: 'Deletion successful!' });
          setTimeout(() => setStatus(null), 3000);
        })
        .catch(error => {
          console.error('Deletion failed:', error);
          setStatus({ type: 'error', message: 'Deletion failed. Please try again.' });
          setTimeout(() => setStatus(null), 3000);
        });
    } else {
      console.log('Deletion handled locally for unsaved course:', course);
      setCourseDetails(prevDetails => {
        const updatedCourses = prevDetails[currentTerm].filter((_, idx) => idx !== currentIndex);
        return { ...prevDetails, [currentTerm]: updatedCourses };
      });
      setStatus({ type: 'success', message: 'Deletion successful!' });
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className="course-details-container">
      {Object.entries(courseDetails).map(([termLabel, courses], termIndex) => (
        <div key={termIndex} className="term-section">
          <h2>{termLabel}</h2>
          <table className="course-details-table">
            <thead>
              <tr>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา (EN)</th>
                <th>ชื่อวิชา (TH)</th>
                <th>หน่วยกิต</th>
                <th>วิชาพื้นฐาน</th>
                <th>คณะสาขา</th>
                <th>หมวดหมู่</th>
                <th>ตัวดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={`${termLabel}-${index}`}>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="SubjectCode" value={course.SubjectCode} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.SubjectCode}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="SubjectNameEnglish" value={course.SubjectNameEnglish} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.SubjectNameEnglish}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="SubjectName" value={course.SubjectName} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.SubjectName}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="Credits" value={course.Credits} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.Credits}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="Preq" value={course.Preq} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.Preq}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="Major" value={course.Major} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.Major}</td>
                  <td>{editMode[`${termLabel}-${index}`] ? <input type="text" name="Type" value={course.Type} onChange={(e) => handleEditChange(e, termLabel, index)} /> : course.Type}</td>
                  <td className="edit-delete-buttons">
                    <button className="edit-button" onClick={() => editMode[`${termLabel}-${index}`] ? handleSaveNewCourse(termLabel, index) : toggleEdit(termLabel, index)}>
                      {editMode[`${termLabel}-${index}`] ? <IoIosSave /> : <IoMdCreate />}
                    </button>
                    <button className="delete-button" onClick={() => openPopup(termLabel, index)}><IoIosTrash /></button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  <button className="add-course-button" onClick={() => handleAddCourse(termLabel)}><IoIosAddCircle /></button>
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
          onClose={() => setStatus(null)}
        />
      )}
      <button className="back-button" onClick={() => navigate(-1)}><IoIosArrowDropleftCircle /></button>
    </div>
  );
};

export default EditSub;
