import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./EditTheCourseTem.css";
import imgTheCourseTem from "../../../assets/editTheC.png";

function EditTheCourseTem() {
  const [Year, setYear] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleAddYear = (event) => {
    const inputYear = event.target.value;
    if (inputYear && inputYear.length === 4 && !isNaN(inputYear)) {
      setYear(inputYear);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleNavigate = (path, semester) => {
    navigate(path, { state: { semester } });
  };
  

  return (
    <div className="container-E">
      <div className="editTheCourseTem-container">
        <input
          className="search-input"
          type="text"
          placeholder="ปีการศึกษา"
          onBlur={handleAddYear}
        />
        <button className="theCourseTem theCourseTem-semester1" onClick={() => handleNavigate('manage','จัดการรายวิชาที่เปิดสอน - ภาคการศึกษาที่ 1')} disabled={isButtonDisabled}>
          <div className="theCourseTem-title">ภาคการศึกษาที่ 1</div>
          <img src={imgTheCourseTem} className="theCourseTem-img" alt="Course Template" />
        </button>
        <button className="theCourseTem theCourseTem-semester2" onClick={() => handleNavigate('manage','จัดการรายวิชาที่เปิดสอน - ภาคการศึกษาที่ 2')} disabled={isButtonDisabled}>
          <div className="theCourseTem-title">ภาคการศึกษาที่ 2</div>
          <img src={imgTheCourseTem} className="theCourseTem-img" alt="Course Template" />
        </button>
        <button className="theCourseTem theCourseTem-summer" onClick={() => handleNavigate('manage','จัดการรายวิชาที่เปิดสอน - ภาคฤดูร้อน')} disabled={isButtonDisabled}>
          <div className="theCourseTem-title">ภาคฤดูร้อน</div>
          <img src={imgTheCourseTem} className="theCourseTem-img" alt="Course Template" />
        </button>
      </div>
    </div>
  );
}

export default EditTheCourseTem;
