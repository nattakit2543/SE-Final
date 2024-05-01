import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CheckRequests.css';

const CheckRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3100/requests');
      setAllRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setError('Failed to fetch requests');
      setLoading(false);
    }
  };

  const handleStatusChange = async (courseCode, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3100/requests/${courseCode}/status`, { status: newStatus });
      if (response.status === 200) {
        setAllRequests(prevRequests =>
          prevRequests.map(req => 
            req.courseCode === courseCode ? { ...req, status: newStatus } : req
          )
        );
      } else {
        console.error('Status update failed:', response.status);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredRequests = allRequests.filter(request => {
    if (activeTab === 'new') return request.status === 'Pending';
    return request.status !== 'Pending';
  });

  return (
    <div className="requests-container">
      <div className="tabs">
        <button className={`tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => handleTabChange('new')}>
          คำร้องใหม่
        </button>
        <button className={`tab ${activeTab === 'replied' ? 'active' : ''}`} onClick={() => handleTabChange('replied')}>
          คำร้องที่ตอบกลับแล้ว
        </button>
      </div>
      {loading && <p className="loading-text">Loading requests...</p>}
      {error && <p className="error-text">{error}</p>}
      {filteredRequests.map(request => (
        <div key={request.courseCode} className="request-item">
          <div className="request-info">
            <span>{request.courseCode}</span> - <span>{request.courseNameEN}</span> - Students: <span>{request.numberOfStudents}</span>
          </div>
          <div className="status-container">
            {activeTab === 'new' ? (
              <>
                <button onClick={() => handleStatusChange(request.courseCode, 'Considered')} className="status-button considered">
                  Consider
                </button>
                <button onClick={() => handleStatusChange(request.courseCode, 'Not Considered')} className="status-button not-considered">
                  Reject
                </button>
              </>
            ) : (
              <button onClick={() => handleStatusChange(request.courseCode, 'Pending')} className="status-button cancel">
                Cancel Response
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckRequests;
