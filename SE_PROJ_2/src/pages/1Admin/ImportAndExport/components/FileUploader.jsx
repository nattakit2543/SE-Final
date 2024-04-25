import React, { useCallback, useState } from "react";
import imgDoc from "../../../../assets/img_doc.png";

const FileUploader = ({ validateFile, apiCallHandler }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const errorMessage = validateFile(file);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    await apiCallHandler("http://localhost:3100/upload", 'post', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }, [file, validateFile, apiCallHandler]);

  return (
    <div className="import-export-card">
      <div className="import-export-title">นำหลักสูตรเข้าสู่ระบบ</div>
      <div className="import-export-image-placeholder">
        <img src={imgDoc} alt="Document" />
      </div>
      <form className="file-input-container" onSubmit={handleSubmit}>
        <label htmlFor="file-input" className="input-file-button">
          เลือกไฟล์
        </label>
        <input
          id="file-input"
          type="file"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="import-export-button">
          อัพโหลด
        </button>
      </form>
    </div>
  );
};

export default FileUploader;
