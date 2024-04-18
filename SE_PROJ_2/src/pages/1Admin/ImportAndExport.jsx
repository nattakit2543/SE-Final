import React, { useState } from "react";
import "./ImportAndExport.css";
import imgCsv from "../../assets/img_csv.png";
import imgXlsx from "../../assets/img_xlsx.png";
import imgDoc from "../../assets/img_doc.png";
import axios from "axios";

function ImportAndExport() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleDownload = async (fileLink, filename) => {
    try {
      const response = await axios.get(fileLink, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleDownloadTeachingSchedule = async () => {
    const fileUrl = "/TeacherSubjectSec1"; // Placeholder, replace with actual URL
    handleDownload(fileUrl, "TeachingSchedule.csv");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus({
        type: "error",
        message: "Please select a file to upload.",
      });
      return;
    } else if (!file.name.endsWith(".xlsx")) {
      setUploadStatus({
        type: "error",
        message: "Only .xlsx files are allowed!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3100/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus({
        type: "success",
        message: "File uploaded successfully!",
      });
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Error uploading file. Please try again.",
      });
    }
  };

  return (
    <div className="container-ImEx">
      <div className="import-export-container">
        <div className="import-export-card">
          <div className="import-export-title">แบบฟอร์ม Excel</div>
          <div className="import-export-image-placeholder">
            <img src={imgXlsx} alt="Excel" />
          </div>
          <button
            className="import-export-button"
            onClick={() =>
              handleDownload(
                "https://docs.google.com/spreadsheets/d/1Vr3u5114jycAwCUDEvrkbtns8fZHOs4R/export?format=xlsx",
                "แบบฟอร์มหลักสูตร.xlsx"
              )
            }
          >
            ดาวโหลดแบบฟอร์ม
          </button>
        </div>
        <div className="import-export-card">
          <div className="import-export-title">นำหลักสูตรเข้าสู่ระบบ</div>
          <div className="import-export-image-placeholder">
            <img src={imgDoc} alt="Excel" />
          </div>
          <form className="file-input-container" onSubmit={handleSubmit}>
            <label htmlFor="file-input" className="input-file-button">
              Choose File
            </label>
            <input
              id="file-input"
              type="file"
              className="file-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="import-export-button">
              Upload
            </button>
          </form>
        </div>
        <div className="import-export-card">
          <div className="import-export-title">ส่งออกตารางสอน</div>
          <div className="import-export-image-placeholder">
            <img src={imgCsv} alt="CSV" />
          </div>
          <button
            className="import-export-button"
            onClick={handleDownloadTeachingSchedule}
          >
            ดาวโหลดแบบฟอร์มของตารางสอน
          </button>
        </div>
        {uploadStatus && (
          <div className="upload-status">{uploadStatus.message}</div>
        )}
      </div>
    </div>
  );
}

export default ImportAndExport;
