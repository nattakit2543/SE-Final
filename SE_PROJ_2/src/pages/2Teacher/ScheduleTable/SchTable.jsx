import React, { useState, useEffect } from 'react';
import './SchTable.css';
import axios from 'axios';

const SchTable = () => {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);
    const teacher = "Smith"; // Mock Data

    useEffect(() => {
        getSubjects(teacher);
    }, [teacher]);

    const getDayClass = (day) => {
        switch (day) {
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

    async function getSubjects(teacherName) {
        const url = `http://localhost:3100/teachersubject/${teacherName}`;
        try {
            const response = await axios.get(url);
            setSubjects(response.data);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
            setError('Failed to fetch subjects. Please try again later.');
        }
    }

    return (
        <div className="schedule-container">
            {error && <div className="error-message">{error}</div>}
            <div className="subject-list">
                <div className="subject-item">
                    <div className={`time-frame day-frame`}>
                        <div className="day">DateTime</div>
                    </div>
                    <div className="course-code">Code</div>
                    <div className="course-name">Name</div>
                    <div className="credits">Credits</div>
                    <div className="groups">Sec</div>
                    <div className="classroom">Room</div>
                </div>
                {subjects.map((subject, index) => (
                    <div key={index} className="subject-item">
                        <div className={`time-frame ${getDayClass(subject.Day)}`}>
                            <div className="day">{subject.Day}</div>
                            <div className="time">{subject.Time}</div>
                        </div>
                        <div className="course-code">{subject.SubjectCode}</div>
                        <div className="course-name">{subject.SubjectName}</div>
                        <div className="credits">{subject.Credit}</div>
                        <div className="groups">{subject.Sec}</div>
                        <div className="classroom">{subject.Room}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchTable;
