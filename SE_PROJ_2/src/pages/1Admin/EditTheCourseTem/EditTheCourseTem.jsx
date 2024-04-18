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

  const terms = [
    { term: "ภาคการศึกษาที่ 1", path: "manage" },
    { term: "ภาคการศึกษาที่ 2", path: "manage" },
    { term: "ภาคฤดูร้อน", path: "manage" },
  ];

  return (
    <div className="container-E">
      <div className="editTheCourseTem-container">
        <input
          className="search-input"
          type="text"
          placeholder="พิมพ์ปีการศึกษาตรงนี้"
          onBlur={handleAddYear}
        />
        {terms.map(({ term, path }) => (
          <Link to={isButtonDisabled ? "#" : `${path}?year=${Year}&term=${encodeURIComponent(term)}`}>
            <button className="theCourseTem" disabled={isButtonDisabled}>
              <div className="theCourseTem-title">{term}</div>
              <img
                src={imgTheCourseTem}
                className="theCourseTem-img"
                alt="Course Template"
              />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default EditTheCourseTem;