import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReqSub.css';
import PopUpRequestSubmission from './componentsT/PopUpReqSub';
import OrderBarList from './componentsT/OrderBarList';
import { v4 as uuidv4 } from 'uuid';

const ReqSub = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const handleAddRequestClick = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    const handleOrderSubmit = useCallback((formData) => {
        setOrders(prevOrders => {
            const newOrder = {
                ...formData,
                id: uuidv4(),
                numberOfStudents: Number(formData.numberOfStudents) // แปลงเป็น number
            };
            const newOrders = [...prevOrders, newOrder];
            localStorage.setItem('orders', JSON.stringify(newOrders));
            return newOrders;
        });
        setShowPopup(false);
    }, []);

    const removeOrder = useCallback((id) => {
        setOrders(currentOrders => {
            const updatedOrders = currentOrders.filter(order => order.id !== id);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    }, []);

    return (
        <div className="request-submission">
            <button className="add-request-btn" onClick={handleAddRequestClick} aria-label="Add new request">เพิ่มคำร้อง</button>
            {showPopup && <PopUpRequestSubmission onClose={handleClosePopup} onSubmit={handleOrderSubmit} />}
            <div className="orders-container" role="list">
                {orders.map((order) => (
                    <OrderBarList key={order.id} order={order} onClose={() => removeOrder(order.id)} />
                ))}
            </div>
        </div>
    );
}

ReqSub.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    showPopup: PropTypes.bool
};

export default ReqSub;
