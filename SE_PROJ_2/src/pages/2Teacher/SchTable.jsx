import React, { useState, useEffect, useMemo } from 'react';
import './SchTable.css';
import scheduleData from '../../assets/data.json';
import axios from 'axios';


const dayMap = {
    M: 1,
    T: 2,
    W: 3,
    Th: 4,
    F: 5,
    Sat: 6,
    Sun: 7,
};


const sortSchedule = (data) => {
    return data.sort((a, b) => {
        const [dayA, timeA] = a.time.split('-');
        const [dayB, timeB] = b.time.split('-');
        const dayDifference = dayMap[dayA] - dayMap[dayB];
        if (dayDifference !== 0) {
            return dayDifference;
        }
        return timeA.localeCompare(timeB);
    });
};

const getDayClass = (time) => {
    const dayCode = time.split('-')[0];
    return `day-${dayCode}`;
};

const SchTable = () => {
    const [schedule, setSchedule] = useState([]);
    const [metadata, setMetadata] = useState({ year: '', usrname: '' });
    const [user, setUser] = useState({});
    
    const [data, setData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // state สำหรับการแสดง/ซ่อน popup
   
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchDetail();
        // Extract metadata and schedule data
        const [metadataEntry, ...scheduleEntries] = scheduleData;
        const sortedSchedule = sortSchedule(scheduleEntries);
        setSchedule(sortedSchedule);
        setMetadata(metadataEntry); // Assuming the first entry is always metadata
        setdatas(user.idUser)

        fetchUserData();



    }, []);
    useEffect(() => {
        if (selectedUserId !== null) {
          fetchTeacherSubjects(selectedUserId);
        }
      }, [selectedUserId]);
    

    useEffect(() => {
        fetchUserData();   
      }, []);

      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3100/userdetail");
          if (response.data.length > 0) {
            setUser(response.data[0]);
            setSelectedUserId(response.data[0].idUser);
            console.log(data);
          }
        } catch (error) {
          console.log("error:", error);
        }
      }
    
      const fetchTeacherSubjects = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:3100/TeacherSubjectSec/${userId}`);
          setData(response.data);
          console.log(data);
        } catch (error) {
          console.log("error:", error);
        }
      }

    // Pre-compute class names for each row
    const scheduleWithClasses = useMemo(() => 
        schedule.map(item => ({
            ...item,
            className: getDayClass(item.time)
        })),
        [schedule]
    );

    return (
        <div className="schedule-container">
            {/* Display metadata at the top */}
            <div className="schedule-header">
                {user.userName}
            </div>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th scope="col">รหัสวิชา</th>
                        <th scope="col">ชื่อวิชา</th>
                        <th scope="col">วัน-เวลา</th>
                        <th scope="col">ห้อง</th>
                        <th scope="col">หมู่เรียน</th>
                        <th scope="col">จำนวนนิสิต</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.code + item.sec} className={item.className}>
                            <td>{item.Subject_idSubject}-{item.Subject_CourseYear_idCourseYear}</td>
                            <td>{item.SubjectName}</td>
                            <td>{item.TimeSlot_Day_idDay}{item.TimeSlot_idTimeSlot}</td>
                            <td>{item.room}</td>
                            <td>{item.Sec}</td>
                            <td>{item.StuNum}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    async function setdatas(id) {
        var url = `http://localhost:3100/subjectschedule/${id}`;
        let retries = 0;
        const maxRetries = 1; // Maximum number of retries
        const delay = 2000; // Delay between retries in milliseconds
    
        while (retries < maxRetries) {
            try {
                const response = await axios.get(url);
                console.log(response.data[0]);
                if (response.data.length > 0) {
                    setData(response.data[0]);
                    break; // Break out of the loop if data is received
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
    
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the delay
            retries++;
        }
    
        if (retries === maxRetries) {
            console.log("Max retries reached. Failed to fetch data.");
        }
      }
      
      async function fetchDetail() {
        let retries = 0;
        const maxRetries = 1; // Maximum number of retries
        const delay = 2000; // Delay between retries in milliseconds
    
        while (retries < maxRetries) {
            try {
                const response = await axios.get("http://localhost:3100/userdetail");
                console.log(response.data[0]);
                if (response.data.length > 0) {
                    setUser(response.data[0]);
                    break; // Break out of the loop if data is received
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
    
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the delay
            retries++;
        }
    
        if (retries === maxRetries) {
            console.log("Max retries reached. Failed to fetch data.");
        }
    }
};

export default SchTable;
