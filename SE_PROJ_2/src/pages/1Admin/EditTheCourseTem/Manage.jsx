import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Manage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Manage() {
  const query = useQuery();
  const year = query.get("year");
  const term = query.get("term");
  const [subjectData, setSubjectData] = useState([]);

  const handleDeleteSubject = indexToDelete => {
    setSubjectData(subjectData.filter((_, index) => index !== indexToDelete));
  };

  const handleCheckboxChange = index => {
    const newSubjects = [...subjectData];
    newSubjects[index].isExternal = !newSubjects[index].isExternal;
    setSubjectData(newSubjects);
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = subjectData.map((subject, i) => {
      if (i === index) {
        const updatedValue = ["students", "studentsPerGroup", "numGroups"].includes(field)
          ? parseInt(value, 10) : value;
        const updatedSubject = { ...subject, [field]: updatedValue };
        updatedSubject.isComplete = ["code", "name", "students", "studentsPerGroup", "numGroups"]
          .every(key => updatedSubject[key] && updatedSubject[key] > 0);
        return updatedSubject;
      }
      return subject;
    });
    setSubjectData(newSubjects);
  };

  const handleAddSubject = () => {
    if (subjectData.length >= 20) {
      alert("รายวิชาเต็มแล้ว");
      return;
    }
    const newSubject = {
      isNew: true,
      isExternal: false,
      code: "",
      name: "",
      students: 0,
      studentsPerGroup: 0,
      numGroups: 0,
      isComplete: false
    };
    setSubjectData([...subjectData, newSubject]);
  };

  return (
    <div className="manage-container">
      <div className="header">
        <h2>{`${term || "ไม่ระบุ"} ปีการศึกษา ${year || "ไม่ระบุ"}`}</h2>
      </div>
      <button className="add-button" onClick={handleAddSubject}>เพิ่มวิชา</button>
      <table className="edit-table">
        <thead>
          <tr>
            <th>วิชานอกคณะ</th>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชา</th>
            <th>จำนวนนิสิต</th>
            <th>จำนวนนิสิต/หมู่</th>
            <th>จำนวนหมู่เรียน</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjectData.map((subject, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" checked={subject.isExternal} onChange={() => handleCheckboxChange(index)} />
              </td>
              <td>
                {subject.isNew ? (
                  <input type="text" value={subject.code} onChange={(e) => handleSubjectChange(index, "code", e.target.value)} />
                ) : (
                  <span>{subject.code}</span>
                )}
              </td>
              <td>
                {subject.isNew ? (
                  <input type="text" value={subject.name} onChange={(e) => handleSubjectChange(index, "name", e.target.value)} />
                ) : (
                  <span>{subject.name}</span>
                )}
              </td>
              <td>
                <input type="number" value={subject.students} onChange={(e) => handleSubjectChange(index, "students", e.target.value)} />
              </td>
              <td>
                <input type="number" value={subject.studentsPerGroup} onChange={(e) => handleSubjectChange(index, "studentsPerGroup", e.target.value)} />
              </td>
              <td>
                <input type="number" value={subject.numGroups} onChange={(e) => handleSubjectChange(index, "numGroups", e.target.value)} />
              </td>
              <td>
                <button onClick={() => handleDeleteSubject(index)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="next-button">ถัดไป</button>
    </div>
  );
}

export default Manage;
