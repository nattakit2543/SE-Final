import React, { useState } from 'react';
import { IoMdCreate } from "react-icons/io";
import './Manage.css';

const Manage = () => {
    const [rows, setRows] = useState([]);
  
    const addRow = () => {
      const newRow = {
        isExternalSubject: false,  // "เป็นวิชานอกคณะ?"
        courseCode: 'Default Text',  // "รหัสวิชา"
        courseName: 'Default Text',  // "ชื่อวิชา"
        studentCount: '',  // "จำนวนนิสิต"
        studentsPerGroup: '',  // "จำนวนนิสิต/หมู่"
        groupCount: '',  // "จำนวนหมู่เรียน"
        columnG:'',
        columnH: false  // "?"
      };
      setRows([...rows, newRow]);
    };
  
    const updateField = (index, column, value) => {
      const updatedRows = rows.map((row, idx) => 
        idx === index ? {...row, [column]: value} : row
      );
      setRows(updatedRows);
    };

    const isFormValid = () => {
      return rows.every(row => row.studentCount && row.studentsPerGroup && row.groupCount);
    };
  
    return (
      <div className="manage-container">
        <div className="grid-container">
          <div className="column-headers">
            {[
              "วิชานอกคณะ", "รหัสวิชา", "ชื่อวิชา", 
              "จำนวนนิสิต", "จำนวนนิสิต/หมู่", "จำนวนหมู่เรียน", "ข้อมูลเพิ่มเติม", "วัน/เวลาเดียวกัน"
            ].map((header, index) => (
              <div key={index} className={`header-cell column-${String.fromCharCode('A'.charCodeAt(0) + index)}`}>
                {header}
              </div>
            ))}
          </div>
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
                    <IoMdCreate className="edit-icon" />
                  ) : (key === 'courseCode' || key === 'courseName') ? (
                    <div className="static-text">{row[key]}</div> 
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
        <p className="instruction">
          ถ้าคุณกดที่ปุ่ม `เพิ่มวิชา`<br />
          จะเพิ่มแถววิชา
        </p>
        <button className="next-button" onClick={() => isFormValid() ? alert('ตรวจสอบข้อมูลแล้วกดถัดไป') : alert('กรุณากรอกข้อมูลในทุกแถว')}>เสร็จสิ้น</button>
      </div>
    );
  };
  
  export default Manage;
