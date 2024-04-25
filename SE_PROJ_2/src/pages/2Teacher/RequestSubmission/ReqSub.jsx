import React, { useState, useCallback, useEffect } from "react";
import "./ReqSub.css";
import PopUpRequestSubmission from "../componentsT/PopUpReqSub";
import OrderBarList from "../componentsT/OrderBarList";
import ConfirmPopup from "../componentsT/ConfirmPopup";
import { v4 as uuidv4 } from "uuid";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

const ReqSub = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [orders, setOrders] = useLocalStorage("orders", []);

  const handleOrderSubmit = useCallback((formData) => {
    setTempData(formData);
    setShowPopup(false);
    setShowConfirmPopup(true);
  }, [setTempData, setShowPopup, setShowConfirmPopup]);

  const confirmOrder = useCallback(() => {
    const newOrder = {
      ...tempData,
      id: uuidv4(),
      status: "Pending",
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setShowConfirmPopup(false);
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
            onClose={() =>
              setOrders((prev) => prev.filter((o) => o.id !== order.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReqSub;
