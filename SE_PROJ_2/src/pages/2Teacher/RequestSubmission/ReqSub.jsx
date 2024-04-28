import React, { useState, useCallback } from 'react';
import "./ReqSub.css";
import PopUpReqSub from "../componentsT/PopUpReqSub";
import OrderBarList from "../componentsT/OrderBarList";
import ConfirmPopup from "../componentsT/ConfirmPopup";
import { useRequests } from '../../../contexts/RequestContext';

const ReqSub = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [tempData, setTempData] = useState(null);
  const { orders, addOrder, deleteOrder } = useRequests();

  const handleOrderSubmit = useCallback((formData) => {
    setTempData(formData);
    setShowPopup(false);
    setShowConfirmPopup(true);
  }, []);

  const confirmOrder = useCallback(() => {
    addOrder({ ...tempData, status: "Pending" }).then(() => {
      setShowConfirmPopup(false);
      setTempData(null);
    });
  }, [tempData, addOrder]);

  const cancelOrder = useCallback(() => {
    setShowConfirmPopup(false);
    setShowPopup(true);
  }, []);

  return (
    <div className="request-submission">
      <button className="add-request-btn" onClick={() => {
        setShowPopup(true);
        setTempData(null);
      }} aria-label="Add new request">
        เพิ่มคำร้อง
      </button>
      {showPopup && (
        <PopUpReqSub
          isOpen={showPopup}
          formData={tempData}
          onClose={() => {
            setShowPopup(false);
            setTempData(null);
          }}
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
