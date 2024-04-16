import React, { useState, } from 'react';

import './Manage.css'; ;
import { IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';




function Manage() {
    const [subjectData, setSubjectData] = useState([]);
    
  


    const location = useLocation();
    const data = location.state;
    const { year , semesterName } = location.state || {}; // ให้ค่าเริ่มต้นเป็นว่างหากไม่มี state
    console.log(data);
    

    



    const handleFinishEditing = () => {
     
    };

    
  
    const handleDeleteSubject = (indexToDelete) => {
      setSubjectData(subjectData.filter((_, index) => index !== indexToDelete));
    };
  
    
    const handleCheckboxChange = (index) => {
      const newSubjects = [...subjectData];
      newSubjects[index].isExternal = !newSubjects[index].isExternal;
      setSubjectData(newSubjects);
    };

   
    const handleSubjectChange = (index, field, value) => {
      const newSubjects = subjectData.map((subject, i) => {
        if (i === index) {
          // อัพเดทวิชาด้วยค่าใหม่สำหรับฟิลด์ที่กำหนด
          // ถ้าฟิลด์นั้นเป็นตัวเลข, ใช้ parseInt แปลงค่าก่อน
          const updatedValue = field === 'students' || 
                               field === 'studentsPerGroup' || field === 'numGroups' 
                               ? parseInt(value, 10) 
                               : value;
          
          const updatedSubject = { ...subject, [field]: updatedValue };
          
          // ตรวจสอบว่าฟิลด์ที่ต้องการทั้งหมดได้ถูกกรอก
          const isComplete = updatedSubject.code.trim() !== '' && 
                   updatedSubject.name.trim() !== '' &&
                   Number.isInteger(updatedSubject.students) && updatedSubject.students > 1 && 
                   Number.isInteger(updatedSubject.studentsPerGroup) && updatedSubject.studentsPerGroup > 1 &&
                   Number.isInteger(updatedSubject.numGroups) && updatedSubject.numGroups > 1;

    
          // คืนค่าวิชาที่ถูกอัพเดทพร้อมสถานะ isComplete
          return { ...updatedSubject, isComplete };
        }
        return subject;
      });
    
      setSubjectData(newSubjects);
    };
    
  
 
    const handleAddSubject = () => {
      // Check if the current number of subjects is 20 or more
      if (subjectData.length >= 20) {
        alert('รายวิชาเต็มแล้ว.');
        return; 
      }
      
      const newSubject = {

        isNew: true,
        isExternal: false,
        code: '', 
        name: '', 
        students: 0, 
        studentsPerGroup: 0, 
        numGroups: 0,
      };
      
    
      setSubjectData([...subjectData, newSubject]);
      checkFormCompletion(); // Check form completion after adding the new subject
    };
    

  const handleDeleteGroup = (subjectIndex, groupIndex) => {
    setSubjectData(subjectData.map((subject, index) => {
      if (index === subjectIndex) {
        // ลดค่า numGroups ของวิชานั้น
        return {...subject, numGroups: subject.numGroups > 0 ? subject.numGroups - 1 : 0};
      }
      return subject;
    }));
  };


  return (
    <div>
      <div className="semester-info">
        <h2>{`${semesterName || 'ไม่ระบุ'}  ปีการศึกษา ${year || 'ไม่ระบุ'}`}</h2>
      </div>
      <table className="edit-table">
        <colgroup>
          <col style={{width: "115px"}} />
          <col style={{width: "130px"}} />
          <col style={{width: "202px"}} />
          <col style={{width: "135px"}} />
          <col style={{width: "160px"}} />
          <col style={{width: "160px"}} />
       
         
          
        </colgroup>
        <thead>
          <tr>
            <th>วิชานอกคณะ</th>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชา</th>
            <th>จำนวนนิสิต</th>
            <th>จำนวนนิสิต/หมู่</th>
            <th>จำนวนหมู่เรียน</th>
          </tr>
        </thead>
        <tbody>
          {subjectData.map((subject, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={subject.isExternal}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              
                <td style={{ textAlign: 'left' }}>
                  {subject.isEditing || subject.isNew  ? (
                   
                    <input 
                      type="text"
                      name="code"
                      value={subject.code || ''}
                      onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                    />
                  ) : (
                    // ถ้าเป็นข้อมูลที่มีอยู่แล้วให้แสดงเป็นข้อความ
                    <span>{subject.name}</span>
                  )}
                </td>

                <td style={{ textAlign: 'left' }}>
                  {subject.isEditing || subject.isNew  ? (
                   
                    <input 
                      type="text"
                      name="name"
                      value={subject.name || ''}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                    />
                  ) : (
                    // ถ้าเป็นข้อมูลที่มีอยู่แล้วให้แสดงเป็นข้อความ
                    <span>{subject.name}</span>
                  )}
                </td>
    
                <td>
                {subject.isNew ? (
                   
                   <input 
                     type="number"
                     name="students"
                     value={subject.students || ''}
                     onChange={(e) => handleSubjectChange(index, 'students', e.target.value)}
                   />
                 ) : (
                   <span>{subject.students}</span>
                 )}
                 </td>
                <td>{subject.isNew ? (
                   <input 
                     type="number"
                     name="studentsPerGroup"
                     value={subject.studentsPerGroup || ''}
                     onChange={(e) => handleSubjectChange(index, 'studentsPerGroup', e.target.value)}
                   />
                 ) : (
                   <span>{subject.studentsPerGroup}</span>
                 )}
                </td>
                <td>{subject.isNew ? (
                   <input 
                     type="number"
                     name="numGroups"
                     value={subject.numGroups || ''}
                     onChange={(e) => handleSubjectChange(index, 'numGroups', e.target.value)}
                   />
                 ) : (
                   <span>{subject.numGroups}</span>
                 )}
                </td>

                <td>
                  {(subject.code !== 0 && subject.code != null || subject.name.trim() !== '' || subject.students !== 0 && subject.students != null || subject.studentsPerGroup !== 0 && subject.studentsPerGroup != null || subject.numGroups !== 0 && subject.numGroups != null) ? (
                    subject.isComplete ? <FaRegCheckCircle className="icon check-icon" /> : <IoIosWarning className="icon warning-icon" />
                  ) : null}
                </td>

                <td>
                  {/* Delete button */}
                  <MdDelete className="delete-button" onClick={() => handleDeleteSubject(index)} />
                </td>


            </tr>
          ))}
        </tbody>
      </table>

      {/* ปุ่มเพิ่มรายวิชา */}
      <button className="add-button" onClick={handleAddSubject} >
        +
      </button> 


      
      
      <button className="finish-button"onClick={handleFinishEditing} >
        ถัดไป 
      </button>
    </div>
    
     
  );
};

export default Manage;