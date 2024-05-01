import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CheckRequests.css';

function CheckRequests() {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('new');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3100/requests');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleResponse = async (courseCode, status) => {
    try {
      const response = await axios.patch(`http://localhost:3100/requests/${courseCode}/status`, { status });
      if (response.status === 200) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.courseCode === courseCode ? { ...order, status } : order
          )
        );
      } else {
        console.error('Status update failed:', response.status);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'new') return order.status === 'Pending';
    return order.status !== 'Pending';
  });

  return (
    <div className="requests-container">
      <div className="tabs">
        <input type="radio" id="radio-new" name="tabs" checked={selectedTab === 'new'} onChange={() => setSelectedTab('new')} />
        <label className="tab" htmlFor="radio-new">คำร้องใหม่<span className="notification">{filteredOrders.length}</span></label>
        <input type="radio" id="radio-responded" name="tabs" checked={selectedTab === 'responded'} onChange={() => setSelectedTab('responded')} />
        <label className="tab" htmlFor="radio-responded">คำร้องที่ตอบกลับแล้ว</label>
        <span className="glider"></span>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredOrders.map(order => (
        <div key={order.courseCode} className="request-item">
          <div className="request-info">
            <span>{order.courseCode}</span> - <span>{order.courseNameEN}</span> - Students: <span>{order.numberOfStudents}</span>
          </div>
          <div className="status-container">
            {selectedTab === 'new' ? (
              <>
                <button onClick={() => handleResponse(order.courseCode, 'Considered')} className="status-button considered">
                  Consider
                </button>
                <button onClick={() => handleResponse(order.courseCode, 'Not Considered')} className="status-button not-considered">
                  Reject
                </button>
              </>
            ) : (
              <button onClick={() => handleResponse(order.courseCode, 'Pending')} className="status-button cancel">
                Cancel Response
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckRequests;
