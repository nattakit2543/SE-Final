import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import "./ReqSub.css";
import PopUpRequestSubmission from "../componentsT/PopUpReqSub";
import OrderBarList from "../componentsT/OrderBarList";
import ConfirmPopup from "../componentsT/ConfirmPopup";
import handleError from "./errorUtils";

const ReqSub = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3100/requests');
        console.log("Orders fetched:", response.data);
        setOrders(response.data);
      } catch (error) {
        handleError(error, { message: 'Failed to fetch orders' });
      }
    };
    fetchOrders();
  }, []);

  const handleOrderSubmit = useCallback((formData) => {
    setTempData(formData);
    setShowPopup(false);
    setShowConfirmPopup(true);
  }, []);

  const confirmOrder = useCallback(async () => {
    try {
      const newOrder = {
        ...tempData,
        status: "Pending"
      };
      const response = await axios.post('http://localhost:3100/requests', newOrder);
      setOrders(prevOrders => [...prevOrders, response.data]); 
      setShowConfirmPopup(false);
    } catch (error) {
      handleError(error, { ...tempData, message: 'Failed to confirm order' });
    }
  }, [tempData]);

  // Delete order
  const deleteOrder = async (courseCode) => {
    try {
      await axios.delete(`http://localhost:3100/requests/${courseCode}`);
      setOrders(currentOrders => currentOrders.filter(order => order.courseCode !== courseCode));
    } catch (error) {
      handleError(error, { message: 'Failed to delete order' });
    }
  };

  const cancelOrder = useCallback(() => {
    setShowConfirmPopup(false);
    setShowPopup(true);
  }, []);

  return (
    <div className="request-submission">
      <button className="add-request-btn" onClick={() => setShowPopup(true)} aria-label="Add new request">
        เพิ่มคำร้อง
      </button>
      {showPopup && (
        <PopUpRequestSubmission
          isOpen={showPopup}
          formData={tempData}
          onClose={() => setShowPopup(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
      {showConfirmPopup && (
        <ConfirmPopup onConfirm={confirmOrder} onCancel={cancelOrder} />
      )}
      <div className="orders-container" role="list">
      {orders.map((order, index) => (
        <OrderBarList
          key={`${order.courseCode}-${index}`} 
          order={order}
          onClose={() => deleteOrder(order.courseCode)}
        />
      ))}
    </div>
    </div>
  );
};

export default ReqSub;
