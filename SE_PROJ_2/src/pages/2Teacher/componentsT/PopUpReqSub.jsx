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

  const [fieldErrors, setFieldErrors] = useState({
    courseCode: false,
    courseNameEN: false,
    courseNameTH: false,
    prevCourse: false,
    courseCategory: false,
    credits: false,
    numberOfStudents: false,
    numberOfGroups: false,
    classYear: false
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const validateField = (name, value) => {
    const isEmptyString = value.trim() === '';
    const rules = {
      courseCode: value => !isEmptyString && /^[0-9\-]*$/.test(value),
      courseNameEN: value => !isEmptyString && /^[a-zA-Z0-9 \-]*$/.test(value),
      courseNameTH: value => !isEmptyString && /^[ก-์0-9 \-]*$/.test(value),
      credits: value => !isEmptyString && /^\d$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 6,
      numberOfStudents: value => !isEmptyString && /^\d{1,3}$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 999,
      numberOfGroups: value => !isEmptyString && /^\d$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 9,
      prevCourse: value => !isEmptyString && /^[a-zA-Z0-9 \-]*$/.test(value),
      courseCategory: value => !isEmptyString,
      classYear: value => !isEmptyString
    };
    return rules[name] ? rules[name](value) : true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validateField(name, value);
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFieldErrors(prev => ({
      ...prev,
      [name]: !isValid
    }));
  };

  const handleSubmission = () => {
    const allFieldsValid = Object.entries(localFormData).every(([key, value]) => validateField(key, value));
    if (allFieldsValid) {
      onSubmit(localFormData);
    } else {
      alert('Some fields are invalid. Please correct them and try again.');
    }
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
      <input type="text" name="courseCode" placeholder="รหัสวิชา" value={localFormData.courseCode} onChange={handleChange} className={`input-field large ${fieldErrors.courseCode ? 'error' : ''}`} />
      <input type="text" name="courseNameEN" placeholder="ชื่อวิชา(EN)" value={localFormData.courseNameEN} onChange={handleChange} className={`input-field large ${fieldErrors.courseNameEN ? 'error' : ''}`} />
      <input type="text" name="courseNameTH" placeholder="ชื่อวิชา(TH)" value={localFormData.courseNameTH} onChange={handleChange} className={`input-field large ${fieldErrors.courseNameTH ? 'error' : ''}`} />
      <input type="text" name="prevCourse" placeholder="วิชาพื้นฐาน" value={localFormData.prevCourse} onChange={handleChange} className={`input-field large ${fieldErrors.prevCourse ? 'error' : ''}`} />
      <select name="courseCategory" value={localFormData.courseCategory} onChange={handleChange} className={`input-field larges ${fieldErrors.courseCategory ? 'error' : ''}`}>
        <option value="">เลือกหมวดวิชา</option>
        <option value="วิชาศึกษาทั่วไป">วิชาศึกษาทั่วไป</option>
        <option value="วิชาเฉพาะบังคับ">วิชาเฉพาะบังคับ</option>
        <option value="วิชาเฉพาะเลือก">วิชาเฉพาะเลือก</option>
      </select>
      <div className="input-group">
        <input type="text" name="credits" placeholder="หน่วยกิต" value={localFormData.credits} onChange={handleChange} className={`input-field small ${fieldErrors.credits ? 'error' : ''}`} />
        <input type="text" name="numberOfStudents" placeholder="จำนวนนิสิต" value={localFormData.numberOfStudents} onChange={handleChange} className={`input-field small ${fieldErrors.numberOfStudents ? 'error' : ''}`} />
      </div>
      <div className="input-group">
        <input type="text" name="numberOfGroups" placeholder="จำนวนหมู่เรียน" value={localFormData.numberOfGroups} onChange={handleChange} className={`input-field small ${fieldErrors.numberOfGroups ? 'error' : ''}`} />
        <select name="classYear" value={localFormData.classYear} onChange={handleChange} className={`class-year-select ${fieldErrors.classYear ? 'error' : ''}`}>
          <option value="">ชั้นปีที่เปิดสอน</option>
          <option value="T12(1)">T12(1)</option>
          <option value="T12(2)">T12(2)</option>
          <option value="T12(2)">T12(3)</option>
        </select>
      </div>
      <button className="button" onClick={handleSubmission}>ส่งคำร้อง</button>
    </div>
  );
}

export default PopUpReqSub;
