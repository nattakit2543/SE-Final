import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; //

function Table() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getondata');
        setData(response.data);
       
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>สรุปผลการเปิดรายวิชา</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>SubjectID</th>
            <th>SubjectName</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID}>
              <td>{item.SubjectID}</td>
              <td>{item.SubjectName}</td>
              <td>{item.Credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
