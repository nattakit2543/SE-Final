import React, { useState, useCallback } from 'react';
import "./ReqSub.css";
import PopUpReqSub from "../componentsT/PopUpReqSub";
import OrderBarList from "../componentsT/OrderBarList";
import ConfirmPopup from "../componentsT/ConfirmPopup";
import ConfirmDelPopup from "../componentsT/ConfirmDelPopup"; 
import { useRequests } from '../../../contexts/RequestContext';

const ReqSub = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const handleDeleteConfirmation = useCallback((order) => {
    setSelectedOrder(order);
    setShowConfirmDeletePopup(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedOrder && selectedOrder.courseCode) {
      deleteOrder(selectedOrder.courseCode);
      setShowConfirmDeletePopup(false);
      setSelectedOrder(null);
    } else {
      console.error("No order selected or missing course code");
      setShowConfirmDeletePopup(false);
    }
  }, [selectedOrder, deleteOrder]);

  const cancelDelete = useCallback(() => {
    setShowConfirmDeletePopup(false);
    setSelectedOrder(null);
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
      {showConfirmDeletePopup && (
        <ConfirmDelPopup onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      <div className="orders-container" role="list">
        {orders.map((order, index) => (
          <OrderBarList
            key={`${order.courseCode}-${index}`}
            order={order}
            onClose={() => handleDeleteConfirmation(order)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReqSub;
