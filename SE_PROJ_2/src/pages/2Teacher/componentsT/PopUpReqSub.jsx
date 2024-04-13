import React, { useState } from 'react';
import './PopUpReqSub.css';
import { IoIosCloseCircle } from 'react-icons/io';
import ConfirmPopup from './ConfirmPopup';  // Make sure this component exists and is exported correctly from its file.

function PopUpReqSub({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseNameEN: '',
    courseNameTH: '',
    prevCourse: '',
    courseCategory: '',
    credits: '',
    numberOfStudents: '',
    numberOfGroups: '',
    classYear: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmission = () => {
    onSubmit(formData);  // This will trigger the onSubmit function passed from the parent component
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="frame">
      <div className="header">
        <p className="header-text">กรอกคำร้อง</p>
        <IoIosCloseCircle className='closeIcon' onClick={onClose} />
      </div>
      <input type="text" name="courseCode" placeholder="รหัสวิชา" value={formData.courseCode} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseNameEN" placeholder="ชื่อวิชา(EN)" value={formData.courseNameEN} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseNameTH" placeholder="ชื่อวิชา(TH)" value={formData.courseNameTH} onChange={handleChange} className="input-field large"/>
      <input type="text" name="prevCourse" placeholder="วิชาพื้นฐาน" value={formData.prevCourse} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseCategory" placeholder="หมวดวิชา" value={formData.courseCategory} onChange={handleChange} className="input-field large"/>
      <div className="input-group">
        <input type="text" name="credits" placeholder="หน่วยกิต" value={formData.credits} onChange={handleChange} className="input-field small"/>
        <input type="text" name="numberOfStudents" placeholder="จำนวนนิสิต" value={formData.numberOfStudents} onChange={handleChange} className="input-field small"/>
      </div>
      <div className="input-group">
        <input type="text" name="numberOfGroups" placeholder="จำนวนหมู่เรียน" value={formData.numberOfGroups} onChange={handleChange} className="input-field small"/>
        <input type="text" name="classYear" placeholder="ชั้นปีที่เปิดสอน" value={formData.classYear} onChange={handleChange} className="input-field small"/>
      </div>
      <button className="button" onClick={handleSubmission}>ส่งคำร้อง</button>
    </div>
  );
}

export default PopUpReqSub;
