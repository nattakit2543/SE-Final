import React, { useState, useEffect, useCallback } from "react";
import "./ReqSub.css";
import PopUpRequestSubmission from "../componentsT/PopUpReqSub";
import OrderBarList from "../componentsT/OrderBarList";
import ConfirmPopup from "../componentsT/ConfirmPopup";
import { v4 as uuidv4 } from "uuid";
import handleError from "./errorUtils";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      handleError(error, { key });
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      handleError(error, { key, value });
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

const ReqSub = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3100/api/requests');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const handleOrderSubmit = useCallback((formData) => {
    setTempData(formData);
    setShowPopup(false);
    setShowConfirmPopup(true);
  }, [setTempData, setShowPopup, setShowConfirmPopup]);

  const confirmOrder = useCallback(() => {
    try {
      const newOrder = {
        ...tempData,
        id: uuidv4(),
        status: "Pending",
      };
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setShowConfirmPopup(false);
    } catch (error) {
      handleError(error, { tempData });
    }
  }, [tempData, setOrders, setShowConfirmPopup]);

  const cancelOrder = useCallback(() => {
    setShowConfirmPopup(false);
    setShowPopup(true);
  }, [setShowConfirmPopup, setShowPopup]);

  return (
    <div className="request-submission">
      <button
        className="add-request-btn"
        onClick={() => setShowPopup(true)}
        aria-label="Add new request"
      >
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
        {orders.map((order) => (
          <OrderBarList
            key={order.id}
            order={order}
            onClose={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
        />
      ))}
      </div>
    </div>
  );
};

export default ReqSub;
