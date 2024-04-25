import React, { useState, useEffect } from 'react';
import './SchTable.css';
import axios from 'axios';

const SchTable = () => {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const url = `http://localhost:3100/teachersubject/${teacherName}`;
        try {
            const response = await axios.get(url);
            setSubjects(response.data);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
            if (error.response) {
                setError('Failed to fetch subjects. The server responded with a status code that falls out of the range of 2xx. Please try again later.');
            } else if (error.request) {
                setError('Failed to fetch subjects. The request was made but no response was received. Please check your network connection.');
            } else {
                setError('Failed to fetch subjects. There was an error in setting up the request. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="schedule-container">
            {isLoading && <div className="loading">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {!isLoading && !error && (
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
                    {subjects.map((subject) => (
                        <div key={subject.SubjectCode} className="subject-item">
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
            )}
        </div>
    );
};

export default SchTable;
