import React, { useState } from "react";
import "./CourseTempPopup.css";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";

const CourseTempPopup = ({ closePopup }) => {
  const [rows1, setRows1] = useState([{}]);
  const [rows2, setRows2] = useState([{}]);
  const [activeTable, setActiveTable] = useState('lecture');

  const addRow1 = () => {
    setRows1([...rows1, {}]);
  };

  const addRow2 = () => {
    setRows2([...rows2, {}]);
  };


  const deleteRow1 = (index) => {
    const newRows = rows1.filter((_, rowIndex) => rowIndex !== index);
    setRows1(newRows);
  };

  const deleteRow2 = (index) => {
    const newRows = rows2.filter((_, rowIndex) => rowIndex !== index);
    setRows2(newRows);
  };


  return (
    <div className="EDC-popup-container">
      <div className="EDC-popup">
        <div>
          {activeTable === 'lecture' && (
            <div className="EDC-inputContainer">
              {rows1.map((_, index) => (
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
                  <IoMdAddCircle className="EDC-icon EDC-addRow1" onClick={addRow1} />
                  <IoMdRemoveCircle
                    className="EDC-icon EDC-deleteRow"
                    onClick={() => deleteRow1(index)}
                  />
                </div>
              ))}

            </div>
          )}
          {activeTable === 'labor' && (
            <div className="EDC-inputContainer">
              {rows2.map((_, index) => (
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
                    onClick={() => deleteRow2(index)}
                  />
            
                  <IoMdAddCircle className="EDC-icon EDC-addRow2" onClick={addRow2} />
          
                </div>
                
              ))}
            </div>
          )}
        </div>


            <button 
              className={"EDC-button1"} 
              onClick={() => setActiveTable('lecture')} 
            >
              หมู่บรรยาย
            </button>
            <button 
              className={"EDC-button2"} 
              onClick={() => setActiveTable('labor')} 
            >
              หมู่ปฏิบัติ
            </button>
          <div className="EDC-headerText">
            <span>จำนวนนิสิตทั้งหมด : 150 </span>
            <span> | </span>
            <span>จำนวนนิสิตคงเหลือ : 0 </span>
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
