import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { IoMdCreate } from "react-icons/io";
import './Manage.css';
import CourseTempPopup from './componentsE/CourseTempPopup'; // Adjust the path as necessary

const Manage = () => {
  const location = useLocation();
  const { Year, Semester } = location.state;

  const [rows, setRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupRowIndex, setPopupRowIndex] = useState(null);

  const addRow = () => {
    const newRow = {
      IsExternal: false,
      SubjectCode: "",
      SubjectName: "",
      SubjectNameEnglish:"",
      Type: "",
      Credits: "",
      groupCount: "",
      columnG: "",
      columnH: false,
      Preq: "",
    };
    setRows([...rows, newRow]);
  };

  const updateField = (index, column, value) => {
    const updatedRows = rows.map((row, idx) =>
      idx === index ? { ...row, [column]: value } : row
    );
    setRows(updatedRows);
  };

  const insertField = (index, column, value) => {
    const updatedRows = rows.map((row, idx) =>
    insertSubject(Year, Semester, row.IsExternal, row.SubjectCode,row.SubjectName, row.SubjectNameEnglish, row.Type, row.Credits, row.groupCount, row.Preq)
    
    );
    setRows([]);
  };




  const togglePopup = (index) => {
    setPopupRowIndex(index);
    setShowPopup(!showPopup);
  };

  const isFormValid = () => {
    return rows.every(row => row.groupCount);
  };

  return (
    <div className="manage-container">
      <div className="column-headers">
        {[
          "วิชานอกคณะ", "รหัสวิชา", "ชื่อวิชา","ชื่อวิชาภาษาอังกฤษ",
          "หมวด", "หน่วยกิต", "จำนวนนิสิตทั้งหมด", "ข้อมูลเพิ่มเติม", "วัน/เวลาเดียวกัน","วิชาพื้นฐาน"
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
                {key === 'IsExternal' || key === 'columnH' ? (
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    checked={row[key]}
                    onChange={(e) => updateField(index, key, e.target.checked)}
                  />
                ) : key === 'columnG' ? (
                  <IoMdCreate className="edit-icon" onClick={() => togglePopup(index)} />
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
      <button className="next-button" onClick={() => insertField()}>เสร็จสิ้น</button>
      {showPopup && <CourseTempPopup closePopup={() => setShowPopup(false)} groupcount={rows[popupRowIndex]?.groupCount }Year={Year} Semester={Semester} />}
    </div>
  );
  async function insertSubject (Year, Semester, IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits,groupCount, Preq) {
    try {
      if(Preq==""){
        Preq="-";
      }
      if(SubjectNameEnglish==""){
        SubjectNameEnglish="-";
      }
      var url = `http://localhost:3100/subjectmanagerinsert/${Year}/${Semester}/${IsExternal}/${SubjectCode}/${SubjectName}/${SubjectNameEnglish}/${Type}/${Credits}/${groupCount}/${Preq}`;
      console.log(url);
      axios.get(url).then((Response) => {
      })
      alert("บันทึกข้อมูลเสร็จสิ้น");
    }catch (e) {
      alert('Error:'+e.message);
    }
}
async function UpdateSubject ( IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits,groupCount, Preq, idSubjectmanager) {
  try {
    if(Preq==""){
      Preq="-";
    }
    if(SubjectNameEnglish==""){
      SubjectNameEnglish="-";
    }
    var url = `http://localhost:3100/subjectmanagerupdate/${IsExternal}/${SubjectCode}/${SubjectName}/${SubjectNameEnglish}/${Type}/${Credits}/${groupCount}/${Preq}/${idSubjectmanager}`;
    console.log(url);
    axios.get(url).then((Response) => {
    })
    alert("บันทึกข้อมูลเสร็จสิ้น");
  }catch (e) {
    alert('Error:'+e.message);
  }
}
};

export default Manage;


