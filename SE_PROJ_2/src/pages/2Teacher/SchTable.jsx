import React from 'react';
import './SchTable.css';

const SchTable = () => {
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
    {
      day: 'Tuesday',
      time: '10:00 - 11:30',
      courseCode: '654321-62',
      courseName: 'ฟิสิกส์เบื้องต้น',
      credits: '3หน่วยกิต',
      groups: 'หมู่801',
      classroom: '17215',
    },
    {
      day: 'Wednesday',
      time: '13:00 - 14:30',
      courseCode: '987654-62',
      courseName: 'เคมีอินทรีย์',
      credits: '3หน่วยกิต',
      groups: 'หมู่802',
      classroom: '17218',
    },
  ];

  const getDayClass = (day) => {
    switch(day) {
      case 'Monday': return 'day-M';
      case 'Tuesday': return 'day-T';
      case 'Wednesday': return 'day-W';
      case 'Thursday': return 'day-Th';
      case 'Friday': return 'day-F';
      case 'Saturday': return 'day-Sat';
      case 'Sunday': return 'day-Sun';
      default: return '';
    }
  };

  return (
    <div className="schedule-container">
      <div className="subject-list">
        {subjects.map((subject) => (
          <div key={subject.courseCode} className="subject-item">
            <div className={`time-frame ${getDayClass(subject.day)}`}>
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
    </div>
  );
};

export default SchTable;
