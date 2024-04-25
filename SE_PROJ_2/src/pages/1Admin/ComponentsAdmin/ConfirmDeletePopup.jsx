import React from "react";
import { IoIosWarning } from "react-icons/io";
import "./ConfirmDeletePopup.css";

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <IoIosWarning className="warning-icon"/>
          <h3>Are you sure you want to delete this course?</h3>
        </div>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="confirm-button">Delete</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
