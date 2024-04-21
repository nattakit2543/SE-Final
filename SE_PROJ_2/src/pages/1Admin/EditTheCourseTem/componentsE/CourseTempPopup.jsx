import React, { useState } from "react";
import "./CourseTempPopup.css";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";

const CourseTempPopup = ({ closePopup }) => {
  const [rows, setRows] = useState([{}]);
  const [group, setGroup] = useState('');

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  return (
    <div className="EDC-popup-container">
      <div className="EDC-popup">
        <div className="EDC-popupHeader">
          <button className="EDC-button1">หมู่บรรยาย</button>
          <button className="EDC-button2">หมู่ปฏิบัติ</button>
          <div className="EDC-headerText">
            <span>จำนวนนิสิตทั้งหมด : 150 </span>
            <span> | </span>
            <span>จำนวนนิสิตคงเหลือ : 0 </span>
          </div>
        </div>
        <div className="EDC-inputContainer">
          {rows.map((_, index) => (
            <div key={index} className="EDC-inputRow">
              <input 
                type="text" 
                className="EDC-inputField" 
                placeholder="หมู่เรียน" 
              />
              <select className="EDC-inputField">
                <option value="">ปีหลักสูตร</option>
                <option value="60">60</option>
                <option value="65">65</option>
              </select>
              <input
                type="text"
                className="EDC-inputField"
                placeholder="จำนวนนิสิต"
              />
              <select className="EDC-inputField">
                <option value="">สาขา/ชั้นปี</option>
                <option value="T12">T12</option>
                <option value="T13">T13</option>
                <option value="T14">T14</option>
              </select>
              <select className="EDC-inputField">
                <option value="">เวลา</option>
                <option value="09:00-12:00">09:00-12:00</option>
                <option value="13:00-16:00">13:00-16:00</option>
              </select>
              <select className="EDC-inputField">
                <option value="">เลือกผู้สอน</option>
                <option value="อ.ดวงดี">อ.ดวงดี</option>
                <option value="อ.ดวงเด่น">อ.ดวงเด่น</option>
              </select>
              <IoMdRemoveCircle
                className="EDC-icon EDC-deleteRow"
                onClick={() => deleteRow(index)}
              />
            </div>
          ))}
        </div>
        <div className="EDC-rowButtons">
            <IoMdAddCircle className="EDC-icon EDC-addRow" onClick={addRow} />
          </div>
        <div className="EDC-actionButtons">
          <button className="EDC-buttonA" onClick={closePopup}>ตกลง</button>
          <button className="EDC-buttonB" onClick={closePopup}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default CourseTempPopup;
