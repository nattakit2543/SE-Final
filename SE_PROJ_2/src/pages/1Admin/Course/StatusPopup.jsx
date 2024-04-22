import React from 'react';
import './StatusPopup.css';

const StatusPopup = ({ status, onClose }) => {
  if (!status) return null;

  let message = '';
  switch (status) {
    case 'processing':
      message = 'Processing is in progress...';
      break;
    case 'success':
      message = 'Deletion successful!';
      break;
    case 'error':
      message = 'Deletion failed. Please try again.';
      break;
    default:
      return null;
  }

  return (
    <div className="status-popup-overlay">
      <div className="status-popup-content">
        <h3>{message}</h3>
        {status !== 'processing' && (
          <div className="status-popup-buttons">
            <button onClick={onClose} className="close-button">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPopup;
