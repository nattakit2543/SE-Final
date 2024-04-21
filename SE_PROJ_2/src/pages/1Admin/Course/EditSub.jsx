import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditSub.css";
import { IoMdCreate } from "react-icons/io";
import { IoIosTrash } from "react-icons/io"; // Import trash icon

const EditSub = () => {
  const navigate = useNavigate();
  const initialCourseDetails = {
    2017: {
      term1: [
        {
          course_code: "CS101",
          course_name_en: "Introduction to Computer Science",
          course_name_th: "แนะนำการเรียนรู้คอมพิวเตอร์",
          credits: 3,
          basic_subject: true,
        },
        {
          course_code: "CS102",
          course_name_en: "Data Structures",
          course_name_th: "โครงสร้างข้อมูล",
          credits: 3,
          basic_subject: true,
        },
        {
          course_code: "CS103",
          course_name_en: "Algorithms",
          course_name_th: "อัลกอริทึม",
          credits: 3,
          basic_subject: true,
        },
        {
          course_code: "CS104",
          course_name_en: "Computer Networks",
          course_name_th: "เครือข่ายคอมพิวเตอร์",
          credits: 3,
          basic_subject: false,
        },
        {
          course_code: "CS105",
          course_name_en: "Operating Systems",
          course_name_th: "ระบบปฏิบัติการ",
          credits: 3,
          basic_subject: false,
        },
      ],
      term2: [
        {
          course_code: "CS106",
          course_name_en: "Software Engineering",
          course_name_th: "วิศวกรรมซอฟต์แวร์",
          credits: 3,
          basic_subject: false,
        },
        {
          course_code: "CS107",
          course_name_en: "Database Systems",
          course_name_th: "ระบบฐานข้อมูล",
          credits: 3,
          basic_subject: false,
        },
        {
          course_code: "CS108",
          course_name_en: "Artificial Intelligence",
          course_name_th: "ปัญญาประดิษฐ์",
          credits: 3,
          basic_subject: false,
        },
        {
          course_code: "CS109",
          course_name_en: "Machine Learning",
          course_name_th: "การเรียนรู้ของเครื่อง",
          credits: 3,
          basic_subject: false,
        },
        {
          course_code: "CS110",
          course_name_en: "Computer Graphics",
          course_name_th: "กราฟิกคอมพิวเตอร์",
          credits: 3,
          basic_subject: false,
        },
      ],
    },
  };

  const [courseDetails, setCourseDetails] = useState(initialCourseDetails);
  const [editMode, setEditMode] = useState({});

  const toggleEdit = (term, index) => {
    setEditMode({ [`${term}-${index}`]: !editMode[`${term}-${index}`] });
  };

  const handleEditChange = (e, term, index) => {
    const { name, value } = e.target;
    const updatedCourses = courseDetails["2017"][term].map((course, idx) => {
      if (idx === index) {
        return { ...course, [name]: value };
      }
      return course;
    });
    setCourseDetails({
      ...courseDetails,
      2017: { ...courseDetails["2017"], [term]: updatedCourses },
    });
  };

  const handleDeleteCourse = (term, index) => {
    const updatedCourses = courseDetails["2017"][term].filter(
      (course, idx) => idx !== index
    );
    setCourseDetails({
      ...courseDetails,
      2017: { ...courseDetails["2017"], [term]: updatedCourses },
    });
  };

  return (
    <div className="course-details-container">
      {Object.entries(courseDetails["2017"]).map(
        ([term, courses], termIndex) => (
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
                    {/* คอลัมน์ต่างๆ */}
                    <td>
                      {editMode[`${term}-${index}`] ? (
                        <input
                          type="text"
                          name="course_code"
                          value={course.course_code}
                          onChange={(e) => handleEditChange(e, term, index)}
                        />
                      ) : (
                        course.course_code
                      )}
                    </td>
                    <td>
                      {editMode[`${term}-${index}`] ? (
                        <input
                          type="text"
                          name="course_name_en"
                          value={course.course_name_en}
                          onChange={(e) => handleEditChange(e, term, index)}
                        />
                      ) : (
                        course.course_name_en
                      )}
                    </td>
                    <td>
                      {editMode[`${term}-${index}`] ? (
                        <input
                          type="text"
                          name="course_name_th"
                          value={course.course_name_th}
                          onChange={(e) => handleEditChange(e, term, index)}
                        />
                      ) : (
                        course.course_name_th
                      )}
                    </td>
                    <td>
                      {editMode[`${term}-${index}`] ? (
                        <input
                          type="number"
                          name="credits"
                          value={course.credits.toString()}
                          onChange={(e) => handleEditChange(e, term, index)}
                        />
                      ) : (
                        course.credits
                      )}
                    </td>
                    <td>
                      {editMode[`${term}-${index}`] ? (
                        <input
                          type="text"
                          name="basic_subject"
                          checked={course.basic_subject}
                          onChange={(e) =>
                            handleEditChange(
                              {
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked, 
                                },
                              },
                              term,
                              index
                            )
                          }
                        />
                      ) : course.basic_subject ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </td>

                    <td className="edit-delete-buttons">
                      <button
                        className="edit-button"
                        onClick={() => toggleEdit(term, index)}
                      >
                        <IoMdCreate />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCourse(term, index)}
                      >
                        <IoIosTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default EditSub;
