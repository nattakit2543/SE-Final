import React, { useState, useCallback } from "react";
import "./ImportAndExport.css";
import imgCsv from "../../../assets/img_csv.png";
import imgXlsx from "../../../assets/img_xlsx.png";
import imgDoc from "../../../assets/img_doc.png";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import UploadStatusPopup from '../ComponentsAdmin/UploadStatusPopup';

const ImportAndExport = React.memo(() => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateFile = useCallback((file) => {
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type)) {
            return "Invalid file type. Only .xlsx files are allowed.";
        }
        if (file.size > 10 * 1024 * 1024) { // 10 MB size limit
            return "File is too large. Maximum size allowed is 10MB.";
        }
        return null;
    }, []);

    const apiCallHandler = useCallback(async (url, method, data = null, config = {}) => {
        setIsLoading(true);
        try {
            const response = await axios({
                url,
                method,
                data,
                ...config,
            });
            return response.data;  // Return response for further processing
        } catch (error) {
            console.error(`Error ${method === 'get' ? 'downloading' : 'uploading'} file:`, error);
            let errorMessage = `Error ${method === 'get' ? 'downloading' : 'uploading'} file. Please check your connection and try again.`;
            if (error.response && error.response.status === 404) {
                errorMessage = "File not found.";
            } else if (error.response && error.response.status === 500) {
                errorMessage = "Server error occurred. Please try again later.";
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Timeout. Please try again later.";
            }
            setUploadStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

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
            setUploadStatus({
                type: "success",
                message: "File downloaded successfully!"
            });
        }
    }, [apiCallHandler]);

    const handleSubmit = useCallback(async (e) => {
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

        const formData = new FormData();
        formData.append("file", file);
        const result = await apiCallHandler("http://localhost:3100/upload", 'post', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (result) {
            setUploadStatus({
                type: "success",
                message: "File uploaded successfully!",
            });
        }
    }, [file, validateFile, apiCallHandler]);

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
                        onClick={() => handleDownload(
                            "https://docs.google.com/spreadsheets/d/1Vr3u5114jycAwCUDEvrkbtns8fZHOs4R/export?format=xlsx",
                            "แบบฟอร์มหลักสูตร.xlsx"
                        )}
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
                    <button className="import-export-button" onClick={() => handleDownload("http://localhost:3100/export", "TeachingSchedule.csv")}>
                        ดาวโหลดแบบฟอร์มของตารางสอน
                    </button>
                </div>
            </div>
            <UploadStatusPopup status={uploadStatus} />
        </div>
    );
});

export default ImportAndExport;
