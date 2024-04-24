import React, { useState } from "react";
import "./ImportAndExport.css";
import imgCsv from "../../../assets/img_csv.png";
import imgXlsx from "../../../assets/img_xlsx.png";
import imgDoc from "../../../assets/img_doc.png";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import UploadStatusPopup from '../ComponentsAdmin/UploadStatusPopup';

function ImportAndExport() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async (fileLink, filename) => {
        setIsLoading(true);
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
            setUploadStatus({
                type: "success",
                message: "File downloaded successfully!"
            });
        } catch (error) {
            console.error("Error downloading the file:", error);
            let errorMessage = "Error downloading the file. Please check your connection and try again.";
            if (error.response && error.response.status === 404) {
                errorMessage = "Error downloading the file: File not found.";
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Download timeout. Please try again later.";
            }
            setUploadStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadTeachingSchedule = async () => {
        const fileUrl = "http://localhost:3100/export"; 
        handleDownload(fileUrl, "TeachingSchedule.xlsx");
    };

    const validateFile = (file) => {
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type)) {
            return "Invalid file type. Only .xlsx files are allowed.";
        }
        if (file.size > 10 * 1024 * 1024) { // 10 MB size limit
            return "File is too large. Maximum size allowed is 10MB.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus({
                type: "error",
                message: "Please select a file to upload.",
            });
            return;
        }
        
        const errorMessage = validateFile(file);
        if (errorMessage) {
            setUploadStatus({
                type: "error",
                message: errorMessage,
            });
            return;
        }
        
        setIsLoading(true);
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
            console.error("Error uploading file:", error);
            let errorMessage = "Error uploading file. Please check your connection and try again.";
            if (error.response && error.response.status === 500) {
                errorMessage = "Server error occurred. Please try again later.";
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Upload timeout. Please try again later.";
            }
            setUploadStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-ImEx">
            {isLoading && <div className="spinner-overlay"><ClipLoader color="#36D7B7" size={150} /></div>}
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
            </div>
            <UploadStatusPopup status={uploadStatus} />
        </div>
    );
}

export default ImportAndExport;
