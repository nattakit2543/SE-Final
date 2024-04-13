import React from 'react';
import './SchTable.css';

const SchTable = () => {
  // Example subject data
  const subjects = [
    {
      day: 'Monday',
      time: '09:00 - 09:30',
      courseCode: '123456-62',
      courseName: 'คิดเลขเร็ว',
      credits: '3หน่วยกิต',
      groups: 'หมู่800',
      classroom: '17212',  
    },

  ];

  return (
    <div className="schedule-container">
      {subjects.map((subject, index) => (
        <div key={index} className="subject-item">
          <div className="time-frame">
            <div className="day">{subject.day}</div>
            <div className="time">{subject.time}</div>
          </div>
          <div className="course-code">{subject.courseCode}</div>
          <div className="course-name">{subject.courseName}</div>
          <div className="credits">{subject.credits}</div>
          <div className="groups">{subject.groups}</div>
          <div className="classroom">{subject.classroom}</div>
        </div>
      ))}
    </div>
  );
};

export default SchTable;
