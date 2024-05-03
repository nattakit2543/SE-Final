import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./CourseTempPopup.css";
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";

const CourseTempPopup = ({ closePopup,groupcount,Year,Semester}) => {
  const [rows1, setRows1] = useState([{}]);
  const [rows2, setRows2] = useState([{}]);
  const [activeTable, setActiveTable] = useState('lecture');
  const [groupCount, setGroupCount] = useState(groupcount);
  const [groupCountRemaining1, setGroupCountRemaining1] = useState(0);
  const [groupCountRemaining2, setGroupCountRemaining2] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'T12', label: 'T12' },
    { value: 'T13', label: 'T13' },
    { value: 'T14', label: 'T14' }
  ];
  
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      console.log(`Option selected:`, selectedOption);
    };
  
  
  
  // const handleInputChange = (index, value) => {
  //  rows1.map((row, i) =>{
  //   setGroupCountRemaining1(groupCountRemaining1 + parseInt(value) )
  //   console.log(groupCountRemaining1);
  //  })
  // };

  const handleInputChange = (index,) => {
    var sum = 0;
    console.log("Test ROW",rows1);
    rows1.map((row, i) =>{
      sum += parseInt(row.studentCount);
    })
    
    if(sum < 0){
      alert('จำนวนนักเรียนน้อยเกินไป');
    }else if(sum > groupCount){
      alert('จำนวนนักเรียนมากกินไป');
    }else{
      setGroupCountRemaining1(sum)
    }
    
  };

  
  const handleInputChange2 = (index,) => {
    var sum = 0;
    console.log("Test ROW",rows2);
    rows2.map((row, i) =>{
      sum += parseInt(row.studentCount);
    })
    
    if(sum < 0){
      alert('จำนวนนักเรียนน้อยเกินไป');
    }else if(sum > groupCount){
      alert('จำนวนนักเรียนมากกินไป');
    }else{
      setGroupCountRemaining2(sum)
    }
    
  };

  const handleInputChang = (index) => {
    handleInputChange(index);
    handleInputChange2(index);
}


 

  const Insert = () => {
    // rows1.map((row, i) =>{
    //   insertSec(Year, Semester,SubjectCode,row.Sec, row.studentCount, row.LabRoom, row.TeacherName, row.TeacherSurname, row.Major, row.CourseYear, row.StudentGrade,row.Day,row.TimeStart,row.TimeEnd,row.SecType)
    // })  
    insertSec (1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
    closePopup ();
  };


  const updateField = (index, value) => {
    setRows1(rows1.map((row, idx) => (idx === index ? { ...row, studentCount: value } : row)));
  };
  
  const updateField2 = (index, value) => {
    setRows2(rows2.map((row, idx) => (idx === index ? { ...row, studentCount: value } : row)));
  };
  
  const addRow1 = () => {
    const newRow = {
      Sec: '',
      studentCount: '',
      LabRoom: '',
      TeacherName: '',
      TeacherSurname: '',
      Major: '',
      courseYear: '',
      StudentGrade: '',
      Day:'',
      TimeStart: '',
      TimeEnd: '',
      SecType: '',
    };
    setRows1([...rows1, newRow]); 
  };
  
  const addRow2 = () => {
    const newRow = {
      Sec: '',
      studentCount: '',
      LabRoom: '',
      TeacherName: '',
      TeacherSurname: '',
      Major: '',
      courseYear: '',
      StudentGrade: '',
      Day:'',
      TimeStart: '',
      TimeEnd: '',
      SecType: '',
    };
    setRows2([...rows1, newRow]); 
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
                    type="number"
                    className="EDC-inputField"
                    placeholder="จำนวนนิสิต"
                    onChange={(e) => updateField(index,e.target.value)}
                  />
                  <Select 
                    className="EDC-inputField"
                    isMulti
                    closeMenuOnSelect={false}
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                  />

                  <select className="EDC-inputField">
                    <option value="">ชั้นปี</option>
                    <option value="T12">1</option>
                    <option value="T13">2</option>
                    <option value="T14">3</option>
                    <option value="T14">4</option>
                    <option value="T14">4x</option>
                  </select>
                  <select className="EDC-inputField">
                    <option value="">เวลา</option>
                    <option value="09:00-12:00">09:00-12:00</option>
                    <option value="13:00-16:00">13:00-16:00</option>
                    <option value="16:30-19:30">16:30-19:30</option>
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
                    type="number"
                    className="EDC-inputField"
                    placeholder="จำนวนนิสิต"
                    onChange={(e) => updateField2(index, e.target.value)}
                  />
                  <Select 
                    className="EDC-inputField"
                    isMulti
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                  />
                  <select className="EDC-inputField">
                    <option value="">ชั้นปี</option>
                    <option value="T12">1</option>
                    <option value="T13">2</option>
                    <option value="T14">3</option>
                    <option value="T14">4</option>
                    <option value="T14">4x</option>
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
              <span>จำนวนนิสิตทั้งหมด : {groupCount} </span>
              <span> | </span>
              {activeTable === 'lecture' && (
                <span>จำนวนนิสิตคงเหลือ (หมู่บรรยาย): {groupCount - groupCountRemaining1} </span>
              )}
              {activeTable === 'labor' && (
                <span>จำนวนนิสิตคงเหลือ (หมู่ปฏิบัติ): {groupCount-groupCountRemaining2} </span>
              )}
            </div>

        <div className="EDC-actionButtons">
          <button className="EDC-buttonA" onClick={() => handleInputChang()}>ยืนยัน</button>
          <button className="EDC-buttonA" onClick={()=> Insert()}>บันทึก</button>
          <button className="EDC-buttonB" onClick={closePopup}>ยกเลิก</button>
        </div>
      </div>

    </div>
  );

  async function insertSec (Year, Semester,SubjectCode,Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,SecType) {
    try {
      
      var url = `http://localhost:3100/secinsert/${Year}/${Semester}/${SubjectCode}/${Sec}/${StuNum}/${LabRoom}/${TeacherName}/${TeacherSurname}/${Major}/${CourseYear}/${StudentGrade}/${Day}/${TimeStart}/${TimeEnd}/${SecType}`;
      console.log(url);
      axios.get(url).then((Response) => {
      })
      alert("บันทึกข้อมูลเสร็จสิ้น");
    }catch (e) {
      alert('Error:'+e.message);
    }
  }


};

export default CourseTempPopup;
