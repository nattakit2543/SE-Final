import React, { useCallback } from "react";
import imgCsv from "../../../../assets/img_csv.png";

const FileExporter = ({ apiCallHandler }) => {
  const handleDownload = useCallback(async (fileLink, filename) => {
    const result = await apiCallHandler(fileLink, 'get', null, {
      responseType: "blob"
    });
    if (result) {
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [apiCallHandler]);

  return (
    <div className="import-export-card">
      <div className="import-export-title">ส่งออกตารางสอน</div>
      <div className="import-export-image-placeholder">
        <img src={imgCsv} alt="CSV" />
      </div>
      <button className="import-export-button" onClick={() => handleDownload("http://localhost:3100/export", "TeachingSchedule.csv")}>
        ดาวโหลดแบบฟอร์มของตารางสอน
      </button>
    </div>
  );
};

export default FileExporter;
