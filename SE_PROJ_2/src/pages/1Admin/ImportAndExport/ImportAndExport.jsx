import React, { useState, useCallback } from "react";
import "./ImportAndExport.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import UploadStatusPopup from '../ComponentsAdmin/UploadStatusPopup';
import FileDownloader from "./components/FileDownloader";
import FileUploader from "./components/FileUploader";
import FileExporter from "./components/FileExporter";

const ImportAndExport = React.memo(() => {
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const clearUploadStatus = () => {
        setUploadStatus(null);
    };

    const validateFile = useCallback((file) => {
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type)) {
            return "Invalid file type. Only .xlsx files are allowed.";
        }
        if (file.size > 10 * 1024 * 1024) {
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
            setUploadStatus({
                type: "success",
                message: `${method === 'get' ? 'Download' : 'Upload'} successful!`
            });
            setTimeout(clearUploadStatus, 5000);
            return response.data;
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
            setTimeout(clearUploadStatus, 5000);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="container-ImEx">
            {isLoading && <div className="spinner-overlay"><ClipLoader color="#36D7B7" size={150} /></div>}
            <div className="import-export-container">
                <FileDownloader apiCallHandler={apiCallHandler} />
                <FileUploader validateFile={validateFile} apiCallHandler={apiCallHandler} />
                <FileExporter apiCallHandler={apiCallHandler} />
                <UploadStatusPopup status={uploadStatus} clearStatus={clearUploadStatus} />
            </div>
        </div>
    );
});

export default ImportAndExport;
