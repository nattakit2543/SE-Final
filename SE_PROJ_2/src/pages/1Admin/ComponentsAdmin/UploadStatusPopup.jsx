import React from 'react';
import './UploadStatusPopup.css';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

const UploadStatusPopup = ({ status }) => {
    if (!status) return null;

    const Icon = status.type === 'success' ? IoMdCheckmarkCircle : IoMdCloseCircle;
    const statusColor = status.type === 'success' ? 'green' : 'red';

    return (
        <div className="unique-upload-status-popup">
            <div className={`unique-upload-status-message ${statusColor}`}>
                <Icon className="status-icon" /> {status.message}
            </div>
        </div>
    );
};

export default UploadStatusPopup;
