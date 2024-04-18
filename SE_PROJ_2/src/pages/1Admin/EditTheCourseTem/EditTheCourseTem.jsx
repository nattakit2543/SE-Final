import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EditTheCourseTem.css";
import imgTheCourseTem from "../../../assets/editTheC.png";

function EditTheCourseTem() {
  const [Year, setYear] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleAddYear = (event) => {
    const inputYear = event.target.value;
    if (inputYear && inputYear.length === 4 && !isNaN(inputYear)) {
      setYear(inputYear);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="container-E">
      <div className="editTheCourseTem-container">
        <input
          className="search-input"
          type="text"
          placeholder="พิมพ์ปีการศึกษาตรงนี้"
          onBlur={handleAddYear}
        />
        <Link to={isButtonDisabled ? "#" : `manage?year=${Year}`}>
          <button className="theCourseTem theCourseTem1" disabled={isButtonDisabled}>
            <div className="theCourseTem-title">ภาคการศึกษาที่ 1</div>
            <img
              src={imgTheCourseTem}
              className="theCourseTem-img"
              alt="Course Template"
            />
          </button>
        </Link>
        <Link to={isButtonDisabled ? "#" : `manage2?year=${Year}`}>
          <button className="theCourseTem theCourseTem2" disabled={isButtonDisabled}>
            <div className="theCourseTem-title">ภาคการศึกษาที่ 2</div>
            <img
              src={imgTheCourseTem}
              className="theCourseTem-img"
              alt="Course Template"
            />
          </button>
        </Link>
        <Link to={isButtonDisabled ? "#" : `manage3?year=${Year}`}>
          <button className="theCourseTem theCourseTem3" disabled={isButtonDisabled}>
            <div className="theCourseTem-title">ภาคฤดูร้อน</div>
            <img
              src={imgTheCourseTem}
              className="theCourseTem-img"
              alt="Course Template"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditTheCourseTem;
