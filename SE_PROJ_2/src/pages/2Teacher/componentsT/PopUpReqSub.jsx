import React, { useState, useEffect } from 'react';
import './PopUpReqSub.css';
import { IoIosCloseCircle } from 'react-icons/io';

function PopUpReqSub({ isOpen, formData, onClose, onSubmit }) {
  const [localFormData, setLocalFormData] = useState({
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

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmission = () => {
    onSubmit(localFormData); 
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
      <input type="text" name="courseCode" placeholder="รหัสวิชา" value={localFormData.courseCode} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseNameEN" placeholder="ชื่อวิชา(EN)" value={localFormData.courseNameEN} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseNameTH" placeholder="ชื่อวิชา(TH)" value={localFormData.courseNameTH} onChange={handleChange} className="input-field large"/>
      <input type="text" name="prevCourse" placeholder="วิชาพื้นฐาน" value={localFormData.prevCourse} onChange={handleChange} className="input-field large"/>
      <input type="text" name="courseCategory" placeholder="หมวดวิชา" value={localFormData.courseCategory} onChange={handleChange} className="input-field large"/>
      <div className="input-group">
        <input type="text" name="credits" placeholder="หน่วยกิต" value={localFormData.credits} onChange={handleChange} className="input-field small"/>
        <input type="text" name="numberOfStudents" placeholder="จำนวนนิสิต" value={localFormData.numberOfStudents} onChange={handleChange} className="input-field small"/>
      </div>
      <div className="input-group">
        <input type="text" name="numberOfGroups" placeholder="จำนวนหมู่เรียน" value={localFormData.numberOfGroups} onChange={handleChange} className="input-field small"/>
        <input type="text" name="classYear" placeholder="ชั้นปีที่เปิดสอน" value={localFormData.classYear} onChange={handleChange} className="input-field small"/>
      </div>
      <button className="button" onClick={handleSubmission}>ส่งคำร้อง</button>
    </div>
  );
}

export default PopUpReqSub;
