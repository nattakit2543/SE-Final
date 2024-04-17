import React, { useState } from 'react';
import './SubjectManager.css';

const SubjectManager = () => {
    const [inputData, setInputData] = useState({
        รหัสวิชา: '',
        ชื่อวิชา: '',
        สาขา: '',
        วันเวลา: '', 
        ผู้สอน: '',
    });

    const mockColumnData = [
        { id: 'รหัสวิชา-ปีหลักสูตร', data: ['0316111-60', '0316112-60', '0316113-60'] },
        { id: 'ชื่อวิชา(EN)', data: ['Programming Fundamentals ', 'Data Structures', 'Computer Networks'] },
        { id: 'ชื่อวิชา(TH)', data: ['พื้นฐานการเขียนโปรแกรม', 'โครงสร้างข้อมูล', 'เครือข่ายคอมพิวเตอร์'] },
        { id: 'จำนวนที่เปิดรับ', data: ['100', '120', '80'] },
        { id: 'หน่วยกิต', data: ['3-2-5', '3-2-5', '3-2-5'] },
        { id: 'หมวดวิชา', data: ['วิชาบังคับ', 'วิชาบังคับ', 'วิชาบังคับ'] },
        { id: 'หมู่', data: ['1', '2', '1'] },
        { id: 'ภาค', data: ['ภาคปกติ', 'ภาคปกติ', 'ภาคปกติ'] },
        { id: 'ผู้สอน', data: ['อ.ทองดี', 'อ.สมชาย', 'อ.สมหญิง'] },
        { id: 'วัน-เวลา', data: ['จันทร์ 9:00-12:00', 'อังคาร 13:00-16:00', 'พุธ 9:00-12:00'] },
        { id: 'สาขา', data: ['วิทยาการคอมพิวเตอร์', 'วิทยาการคอมพิวเตอร์', 'วิทยาการคอมพิวเตอร์'] },
    ];

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', inputData);
        // Typically send the data to your backend here
    };

    return (
        <div className="subManager-container">
            <div className="subject-manager">
                <h2>สรุปผลการเปิดรายวิชา</h2>
                <form onSubmit={handleSubmit} className="input-form">
                    {Object.entries(inputData).map(([key, value]) => (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            placeholder={key}
                        />
                    ))}
                    <button type="submit">ค้นหา</button>
                </form>
                <div className="data-display">
                    <div className="scroll-container">
                        {mockColumnData.map((column) => (
                            <div className={`data-column column-${column.id}`} key={column.id}>
                                <div className="column-header">{column.id}</div>
                                {column.data.map((item, index) => (
                                    <div className="column-data" key={index}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubjectManager;
