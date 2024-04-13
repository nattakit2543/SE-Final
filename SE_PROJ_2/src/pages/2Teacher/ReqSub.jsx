import React, { useState, useCallback, useEffect } from 'react';
import './ReqSub.css';
import PopUpRequestSubmission from './componentsT/PopUpReqSub';
import OrderBarList from './componentsT/OrderBarList';
import ConfirmPopup from './componentsT/ConfirmPopup';
import { v4 as uuidv4 } from 'uuid';

const ReqSub = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [tempData, setTempData] = useState(null);
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const handleOrderSubmit = useCallback((formData) => {
        setTempData(formData);
        setShowPopup(false);
        setShowConfirmPopup(true);
    }, []);

    const confirmOrder = useCallback(() => {
        setShowConfirmPopup(false);
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
    }, [tempData]);

    const cancelOrder = useCallback(() => {
        setShowConfirmPopup(false);
        setShowPopup(true);  
    }, []);

    return (
        <div className="request-submission">
            <button className="add-request-btn" onClick={() => setShowPopup(true)} aria-label="Add new request">เพิ่มคำร้อง</button>
            {showPopup && <PopUpRequestSubmission isOpen={showPopup} formData={tempData} onClose={() => setShowPopup(false)} onSubmit={handleOrderSubmit} />}
            {showConfirmPopup && <ConfirmPopup onConfirm={confirmOrder} onCancel={cancelOrder} />}
            <div className="orders-container" role="list">
                {orders.map((order) => (
                    <OrderBarList key={order.id} order={order} onClose={() => setOrders(prev => prev.filter(o => o.id !== order.id))} />
                ))}
            </div>
        </div>
    );
};

export default ReqSub;
