import React from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import './StatusPopup.css';

const StatusPopup = ({ status }) => {
  if (!status) return null;

  let message = '';
  let icon = null;

  switch (status) {
    case 'processing':
      message = 'Processing is in progress...';
      icon = <LuLoader className="status-icon processing" />;
      break;
    case 'success':
      message = 'Deletion successful!';
      icon = <IoIosCheckmarkCircle className="status-icon success" />;
      break;
    case 'error':
      message = 'Deletion failed. Please try again.';
      icon = <IoIosCloseCircle className="status-icon error" />;
      break;
    default:
      return null;
  }

  return (
    <div className="status-popup-overlay">
      <div className="status-popup-content">
        {icon}
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default StatusPopup;
