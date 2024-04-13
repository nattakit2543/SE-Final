import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReqSub.css';
import PopUpRequestSubmission from './componentsT/PopUpReqSub';
import OrderBarList from './componentsT/OrderBarList';
import ConfirmPopup from './componentsT/ConfirmPopup';  // Import นี้เพิ่ม
import { v4 as uuidv4 } from 'uuid';

const ReqSub = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // สถานะใหม่สำหรับ ConfirmPopup
    const [tempData, setTempData] = useState(null); // ข้อมูลชั่วคราวสำหรับยืนยัน
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    const handleOrderSubmit = useCallback((formData) => {
        setTempData(formData);
        setShowConfirmPopup(true); // แสดง ConfirmPopup
    }, []);

    const confirmOrder = () => {
        // ยืนยันและเพิ่มคำสั่งลงในสถานะ orders
        setShowConfirmPopup(false);
        setShowPopup(false);
        setOrders(prevOrders => {
            const newOrder = {
                ...tempData,
                id: uuidv4(),
                status: 'Pending'
            };
            const newOrders = [...prevOrders, newOrder];
            localStorage.setItem('orders', JSON.stringify(newOrders));
            return newOrders;
        });
    };

    return (
        <div className="request-submission">
            <button className="add-request-btn" onClick={() => setShowPopup(true)} aria-label="Add new request">เพิ่มคำร้อง</button>
            {showPopup && <PopUpRequestSubmission isOpen={showPopup} onClose={() => setShowPopup(false)} onSubmit={handleOrderSubmit} />}
            {showConfirmPopup && <ConfirmPopup onConfirm={confirmOrder} onCancel={() => setShowConfirmPopup(false)} />}
            <div className="orders-container" role="list">
                {orders.map((order) => (
                    <OrderBarList key={order.id} order={order} onClose={() => setOrders(prev => prev.filter(o => o.id !== order.id))} />
                ))}
            </div>
        </div>
    );
};

export default ReqSub;
