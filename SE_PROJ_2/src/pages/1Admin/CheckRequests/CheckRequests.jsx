import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CheckRequests.css';

const CheckRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3100/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3100/requests/${id}`, { status: newStatus });
      setRequests(prevRequests =>
        prevRequests.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="requests-container">
      {requests.map(request => (
        <div key={request.id} className="request-item">
          <div className="request-info">
            <span>{request.courseCode}</span> - <span>{request.courseNameEN}</span> - Students: <span>{request.numberOfStudents}</span>
          </div>
          <div className="status-container">
            <button onClick={() => handleStatusChange(request.id, 'Considered')} className="status-button considered">
              Consider
            </button>
            <button onClick={() => handleStatusChange(request.id, 'Not Considered')} className="status-button not-considered">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckRequests;
