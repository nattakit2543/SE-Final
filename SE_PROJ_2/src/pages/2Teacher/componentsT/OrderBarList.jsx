import React from 'react';
import PropTypes from 'prop-types';
import './OrderBarList.css';
import { IoIosCloseCircle } from 'react-icons/io';

const getStatusBoxColor = (status) => {
    switch (status) {
        case 'Pending':
            return '#F2C44E'; 
        case 'Not Considered':
            return '#EF6B6B';
        case 'Considered':
            return '#4CAF50'; 
        default:
            return '#F2C44E'; 
    }
};

const OrderBarList = ({ order, onClose }) => {
    return (
        <div className="oblContainer" role="listitem" aria-label={`Order ${order.courseCode}`}>
            <div className="order-bar-list">
                <IoIosCloseCircle className="close-icon" onClick={onClose} onKeyDown={(e) => e.key === 'Enter' && onClose()} aria-label="Close order" role="button" tabIndex="0"/>
                <div className="order-info">
                    {order.courseCode} - {order.courseNameEN} - {order.numberOfStudents}
                </div>
                <div className="status-box" style={{ backgroundColor: getStatusBoxColor(order.status) }}>
                    <span className="status-text">สถานะคำร้อง {order.status}</span>
                </div>
            </div>
        </div>
    );
};

OrderBarList.propTypes = {
    order: PropTypes.shape({
        courseCode: PropTypes.string.isRequired,
        courseNameEN: PropTypes.string.isRequired,
        numberOfStudents: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default OrderBarList;
