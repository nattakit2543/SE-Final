
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditTheCourse = () => {
  const [courses, setCourses] = useState([]); // จัดเก็บรายการหลักสูตร
  const navigate = useNavigate();

  useEffect(() => {
    // เรียก API เมื่อ component ถูก mount
    fetch('http://localhost:3100/courseyear')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching course years:', error));
  }, []); // วงเล็บสี่เหลี่ยมแสดงว่า useEffect นี้จะทำงานครั้งเดียวเมื่อ component mount
 
  const deleteCourseYear = async (year) => {
    if(window.confirm(`คุณแน่ใจว่าต้องการลบหลักสูตรปีการศึกษา ${year}?`)) {
      try {
        const response = await fetch(`http://localhost:3100/course/${year}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Problem deleting course year');
        // อัปเดต state เพื่อลบหลักสูตรออกจาก UI
        setCourses(courses.filter(course => course.year !== year));
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <h1>หลักสูตรทั้งหมด</h1>
      <div>
        {courses.map((course) => (
          <div key={course.idCourseYear}>
            <button onClick={() => navigate(`/EditSub/${course.idCourseYear}`)}>
              {`หลักสูตรปีการศึกษา ${course.idCourseYear}`}
            </button>
            {/* <FaEdit onClick={() => navigate(`/edit/${course.idCourseYear}`)} /> */}
            <FaTrash onClick={() => deleteCourseYear(course.idCourseYear)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default EditTheCourse;
