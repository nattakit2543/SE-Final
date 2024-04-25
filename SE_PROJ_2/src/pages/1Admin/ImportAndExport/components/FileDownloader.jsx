import React, { useCallback } from "react";
import imgXlsx from "../../../../assets/img_xlsx.png";

const FileDownloader = ({ apiCallHandler }) => {
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
      <div className="import-export-title">แบบฟอร์ม Excel</div>
      <div className="import-export-image-placeholder">
        <img src={imgXlsx} alt="Excel" />
      </div>
      <button
        className="import-export-button"
        onClick={() => handleDownload(
          "https://docs.google.com/spreadsheets/d/1Vr3u5114jycAwCUDEvrkbtns8fZHOs4R/export?format=xlsx",
          "แบบฟอร์มหลักสูตร.xlsx"
        )}
      >
        ดาวโหลดแบบฟอร์ม
      </button>
    </div>
  );
};

export default FileDownloader;
