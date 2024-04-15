import React, { useEffect, useState } from 'react';
import './CheckRequests.css';

const CheckRequests = () => {
    const [requests, setRequests] = useState([
        {
            id: 'req1',
            courseCode: 'IT101',
            courseNameEN: 'Introduction to IT',
            details: {
                numberOfStudents: 100
            },
            status: 'Pending'
        },
        {
            id: 'req2',
            courseCode: 'DS202',
            courseNameEN: 'Data Structures',
            details: {
                numberOfStudents: 50
            },
            status: 'Pending'
        }
    ]);

    // Normally here you would fetch requests from an API
    // useEffect(() => {
    //     async function fetchRequests() {
    //         // API call logic here
    //         // const response = await fetch('/api/requests');
    //         // const data = await response.json();
    //         // setRequests(data);
    //     }
    //     fetchRequests();
    // }, []);

    const handleStatusChange = (id, newStatus) => {
        setRequests(prev =>
            prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
        );
    };

    return (
        <div className="requests-container">
            {requests.map(request => (
                <div key={request.id} className="request-item">
                    <div className="request-info">
                        <span>{request.courseCode}</span> - <span>{request.courseNameEN}</span> - Students: <span>{request.details.numberOfStudents}</span>
                    </div>
                    <div className="status-container">
                        <button onClick={() => handleStatusChange(request.id, 'Considered')} className="status-button considered">Consider</button>
                        <button onClick={() => handleStatusChange(request.id, 'Not Considered')} className="status-button not-considered">Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckRequests;
