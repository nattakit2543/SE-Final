import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import ConfirmPopup from './ConfirmPopup'; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
import './PopUpReqSub.css';

function PopUpReqSub({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseNameEN: '',
    courseNameTH: '',
    credits: '',
    numberOfStudents: '',
    numberOfSections: '',
    prevSJ: '',
  });

  const [formValidity, setFormValidity] = useState({
    courseCode: true,
    courseNameEN: true,
    courseNameTH: true,
    credits: true,
    numberOfStudents: true,
    numberOfSections: true,
    prevSJ: true,
  });

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [animationTrigger, setAnimationTrigger] = useState(false);

  const validateField = (name, value) => {
    const isEmptyString = value.trim() === '';
    const rules = {
      courseCode: value => !isEmptyString && /^[0-9\-]*$/.test(value),
      courseNameEN: value => !isEmptyString && /^[a-zA-Z0-9 \-]*$/.test(value),
      courseNameTH: value => !isEmptyString && /^[ก-์0-9 \-]*$/.test(value),
      credits: value => !isEmptyString && /^\d$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 6,
      numberOfStudents: value => !isEmptyString && /^\d{1,3}$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 999,
      numberOfSections: value => !isEmptyString && /^\d$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 9,
      prevSJ: value => !isEmptyString && /^[a-zA-Z0-9 \-]*$/.test(value),
    };
    return rules[name](value);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const isValid = validateField(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormValidity(prev => ({ ...prev, [name]: isValid }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const allFieldsValid = Object.keys(formData).every(key => validateField(key, formData[key]));

    if (allFieldsValid) {
      setShowConfirmPopup(true);
    } else {
      setAnimationTrigger(!animationTrigger);

      const updatedFormValidity = {};
      Object.keys(formData).forEach(key => {
        updatedFormValidity[key] = validateField(key, formData[key]);
      });
      setFormValidity(updatedFormValidity);
    }
  };

  const handleConfirm = () => {
    const submitData = {
      ...formData,
      numberOfStudents: Number(formData.numberOfStudents)
    };
    onSubmit(submitData);
    setShowConfirmPopup(false);
    onClose();
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const renderInputField = (id, name, placeholder) => (
    <input
      key={id + animationTrigger}
      id={id}
      className={`form-input ${!formValidity[name] ? 'invalid' : ''}`}
      type='text'
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <div className='popup-container'>
      <div className='popup'>
        <div className='popupHeader'>
          <h2 className='textHeader'>กรอกคำร้อง</h2>
          <IoIosCloseCircle className='closeIcon' onClick={onClose} />
        </div>
        <div className='popupBody'>
          <form onSubmit={handleSubmit}>
            {renderInputField('courseCode', 'courseCode', 'รหัสวิชา')}
            {renderInputField('courseNameEN', 'courseNameEN', 'ชื่อวิชา (EN)')}
            {renderInputField('courseNameTH', 'courseNameTH', 'ชื่อวิชา (TH)')}
            {renderInputField('credits', 'credits', 'หน่วยกิต')}
            {renderInputField('numSTD', 'numberOfStudents', 'จำนวนนิสิต')}
            {renderInputField('numSec', 'numberOfSections', 'จำนวนหมู่เรียน')}
            {renderInputField('prevSJ', 'prevSJ', 'วิชาพื้นฐาน (ถ้าไม่มีให้ใส่ `-`)')}
            <button type='submit' className='submitButton'>ส่งคำร้อง</button>
          </form>
        </div>
      </div>
      {showConfirmPopup && (
        <ConfirmPopup onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default PopUpReqSub;
