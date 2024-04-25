import React, { useState } from 'react';
import { IoMdCreate } from "react-icons/io";
import './Manage.css';
import CourseTempPopup from './componentsE/CourseTempPopup';  // Adjust the path as necessary

const Manage = () => {
  const [rows, setRows] = useState([
    {
      isExternalSubject: false,
      courseCode: '03603212',
      courseName: 'Abstract',
      studentCount: 'เสรี',
      studentsPerGroup: '3 (3-0-6)',
      groupCount: '',
      columnG: '',
      columnH: false
    },
    {
      isExternalSubject: false,
      courseCode: '03603213',
      courseName: 'Algorithms',
      studentCount: 'บังคับ',
      studentsPerGroup: '3 (3-0-6)',
      groupCount: '',
      columnG: '',
      columnH: false
    },
    // เพิ่มข้อมูลเพิ่มเติมตามที่คุณต้องการ
  ]);
  
    const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
  
    const addRow = () => {
      const newRow = {

        isExternalSubject: false,
        courseCode: '',
        courseName: '',
        studentCount: '',
        studentsPerGroup: '',
        groupCount: '',
        columnG: '',
        columnH: false
      };
      setRows([...rows, newRow]);
    };
  
    const updateField = (index, column, value) => {
      const updatedRows = rows.map((row, idx) => 
        idx === index ? {...row, [column]: value} : row
      );
      setRows(updatedRows);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const isFormValid = () => {
      return rows.every(row => row.groupCount);
    };
  
    return (
      <div className="manage-container">
        <div className="column-headers">
            {[
              "วิชานอกคณะ", "รหัสวิชา", "ชื่อวิชา", 
              "หมวด", "หน่วยกิต", "จำนวนนิสิตทั้งหมด", "ข้อมูลเพิ่มเติม", "วัน/เวลาเดียวกัน"
            ].map((header, index) => (
              <div key={index} className={`header-cell column-${String.fromCharCode('A'.charCodeAt(0) + index)}`}>
                {header}
              </div>
            ))}
          </div>
        <div className="grid-container">
          {rows.map((row, index) => (
            <div key={index} className="row">
             {Object.keys(row).map((key, idx) => (
                <div key={key} className={`cell column-${String.fromCharCode('A'.charCodeAt(0) + idx)}`}>
                  {key === 'isExternalSubject' || key === 'columnH' ? (
                    <input 
                      type="checkbox" 
                      className="input-checkbox" 
                      checked={row[key]} 
                      onChange={(e) => updateField(index, key, e.target.checked)}
                    />
                  ) : key === 'columnG' ? (
                    <IoMdCreate className="edit-icon" onClick={togglePopup} />
                  ) : (
                    <input
                      type="text"
                      className="input-field-a"
                      value={row[key] || ''}
                      onChange={(e) => updateField(index, key, e.target.value)}
                    />
                  )}
                </div>
              ))}


            </div>
          ))}
        </div>
        <button className="add-row-button" onClick={addRow}>เพิ่มวิชา</button>
        <button className="next-button" onClick={() => isFormValid() ? alert('ตรวจสอบข้อมูลแล้วกดถัดไป') : alert('กรุณากรอกข้อมูลในทุกแถว')}>เสร็จสิ้น</button>
        {showPopup && <CourseTempPopup closePopup={togglePopup} />}
      </div>
    );
};

export default Manage;
