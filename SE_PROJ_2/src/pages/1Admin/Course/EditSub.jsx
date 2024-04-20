
// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { FaEdit, FaTrash } from 'react-icons/fa';


// // // function EditSub({ course, onEdit }){
  
  

// // //     const handleDelete = () => {
// // //         if (window.confirm(`คุณต้องการลบวิชา ${course.name} หรือไม่?`)) {
// // //           onDelete(course.id);
// // //         }
// // //       }
// // //       const onDelete = (courseId) => {
// // //         fetch(`http://localhost:3100/courses/${courseId}`, { method: 'DELETE' })
// // //           .then(response => {
// // //             if (!response.ok) throw new Error('Error deleting course');
// // //             // ลบข้อมูลวิชาออกจาก state หรือเรียกใช้งาน API เพื่อโหลดข้อมูลใหม่
// // //           })
// // //           .catch(error => console.error('Error:', error));
// // //       };
// // //     const [subjects11, setSubjects11] = useState([]);
// // //     const [subjects12, setSubjects12] = useState([]);

// // //     // โหลดข้อมูลเมื่อ component ถูก mount
// // //     useEffect(() => {
// // //     // ดึงข้อมูลสำหรับ StudentGrade 11
// // //     fetch('http://localhost:3100/subjects/11')
// // //         .then(response => response.json())
// // //         .then(data => setSubjects11(data));

// // //     // ดึงข้อมูลสำหรับ StudentGrade 12
// // //     fetch('http://localhost:3100/subjects/12')
// // //         .then(response => response.json())
// // //         .then(data => setSubjects12(data));
// // //     }, []);
    
// // //     return(
// // //         <>
// // //         <div>
// // //         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 11</h5>
// // //         <div>
// // //         <table>
// // //         <thead>
// // //           <tr>
// // //             <th>รหัสวิชา</th>
// // //             <th>ชื่อวิชา</th>
// // //             <th>ชื่อวิชาภาษาอังกฤษ</th>
// // //             <th>ชั้นปี</th>
// // //             <th>วิชาพื้นฐาน</th>
            
// // //             {/* และอื่นๆ ตามที่ต้องการ */}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {subjects11.map(subject => (
// // //             <tr key={subject.id}>
// // //                 {/* <FaEdit  />  */}
// // //                 <button onClick={() => handleEditClick(subject)}>
// // //               <FaEdit />
// // //             </button>
// // //                 <button onClick={() => onDelete(subject.idSubject)}> <FaTrash /></button>
// // //                 {/* <button type="button" className="btn btn-success" onClick={onDelete(subject.idSubject)}>Load Data</button> */}
// // //               <td>{subject.idSubject}</td>
// // //               <td>{subject.SubjectName}</td>
// // //               <td>{subject.SubjectNameEnglish}</td> 
// // //               <td>{subject.StudentGrade_idStudentGrade}</td>
// // //               <td>{subject.Preq}</td>
// // //               {/* และอื่นๆ ตามที่ต้องการ */}
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
        
// // //         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 12</h5>
// // //         <div>
// // //         <table>
// // //         <thead>
// // //           <tr>
            
// // //             <th>รหัสวิชา</th>
// // //             <th>ชื่อวิชา</th>
// // //             <th>ชื่อวิชาภาษาอังกฤษ</th>
// // //             <th>ชั้นปี</th>
// // //             <th>วิชาพื้นฐาน</th>
            
// // //             {/* และอื่นๆ ตามที่ต้องการ */}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {subjects12.map(subject => (
// // //             <tr key={subject.id}>
// // //                 <FaEdit  />            
// // //                 <button onClick={() => onDelete(subject.idSubject)}> <FaTrash /></button>
// // //               <td>{subject.idSubject}</td>
// // //               <td>{subject.SubjectName}</td>
// // //               <td>{subject.SubjectNameEnglish}</td> 
// // //               <td>{subject.StudentGrade_idStudentGrade}</td>
// // //               <td>{subject.Preq}</td>
              
              
// // //               {/* และอื่นๆ ตามที่ต้องการ */}
// // //             </tr>
            
// // //           ))}
// // //         </tbody>
// // //        </table>
// // //         </div>
// // //     </div>
        
// // //         </>
// // //     )
// // // }

// // // export default EditSub


// // import React, { useState, useEffect } from 'react';
// // import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

// // function EditSub() {
// //   const [subjects11, setSubjects11] = useState([]);
// //   const [subjects12, setSubjects12] = useState([]);
// //   const [editSubjectId, setEditSubjectId] = useState(null);
// //   const [editSubjectCode, setEditSubjectCode] = useState('');

// //   useEffect(() => {
// //     //     // ดึงข้อมูลสำหรับ StudentGrade 11
// //         fetch('http://localhost:3100/subjects/11')
// //             .then(response => response.json())
// //             .then(data => setSubjects11(data));
    
// //     //     // ดึงข้อมูลสำหรับ StudentGrade 12
// //         fetch('http://localhost:3100/subjects/12')
// //             .then(response => response.json())
// //             .then(data => setSubjects12(data));
// //         }, []);

// //   const handleEditClick = (subject) => {
// //     setEditSubjectId(subject.idSubject);
// //     setEditSubjectCode(subject.idSubject);
// //   };

// //   const handleSaveClick = (subjectId) => {
// //     // Implement the save functionality here
// //     // For example, send a PATCH request to your backend server:
// //     fetch(`http://localhost:3100/subjects/${subjectId}`, {
// //       method: 'PATCH',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ idSubject: editSubjectCode }),
// //     })
// //     .then(response => {
// //       if (!response.ok) throw new Error('Error updating subject');
// //       // Re-fetch the subjects or update the state accordingly
// //       setEditSubjectId(null);
// //     })
// //     .catch(error => console.error('Error:', error));
// //   };

// //   const renderRow = (subject, grade) => {
// //     const isEditing = editSubjectId === subject.idSubject;
    
// //     return (
// //       <tr key={subject.idSubject}>

// //         {isEditing ? (
// //           <td>
// //             <input
// //               type="text"
// //               value={editSubjectCode}
// //               onChange={(e) => setEditSubjectCode(e.target.value)}
// //             />
// //             <button onClick={() => handleSaveClick(subject.idSubject)}>
// //               <FaSave />
// //             </button>
// //           </td>
// //         ) : (
// //           <>
// //             <td>{subject.idSubject}</td>
// //           </>
// //         )}

    

// //         <td>{subject.SubjectName}</td>
// //         <td>{subject.SubjectNameEnglish}</td>
// //         <td>{subject.StudentGrade_idStudentGrade}</td>
// //         <td>{subject.Preq}</td>
// //         <button onClick={() => onDelete(subject.idSubject)}>
// //           <FaTrash />
// //         </button>
// //         <button onClick={() => handleEditClick(subject)}>
// //               <FaEdit />
// //             </button>
// //       </tr>
      

// //     );
// //   };

// //   return (
// //     <>
// //       <div>
// //         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 11</h5>
// //         <table>
// //           {/* Table headers and body for subjects11 */}
// //           <tbody>
// //             {subjects11.map((subject) => renderRow(subject, 11))}
// //           </tbody>
// //         </table>

// //         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 12</h5>
// //         <table>
// //           {/* Table headers and body for subjects12 */}
// //           <tbody>
// //             {subjects12.map((subject) => renderRow(subject, 12))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </>
// //   );
// // }

// // export default EditSub;


// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

// function EditSub() {
//   const [subjects11, setSubjects11] = useState([]);
//   const [subjects12, setSubjects12] = useState([]);
//   const [editSubjectId, setEditSubjectId] = useState(null);
  
//   const [editFormData, setEditFormData] = useState({
//     idSubject: '',
//     SubjectName: '',
//     SubjectNameEnglish: '',
//     // Add other fields here if needed
//   });
//   useEffect(() => {
//     //     // ดึงข้อมูลสำหรับ StudentGrade 11
//         fetch('http://localhost:3100/subjects/11')
//             .then(response => response.json())
//             .then(data => setSubjects11(data));
    
//     //     // ดึงข้อมูลสำหรับ StudentGrade 12
//         fetch('http://localhost:3100/subjects/12')
//             .then(response => response.json())
//             .then(data => setSubjects12(data));
//         }, []);

//   // const handleEditClick = (subject) => {
//   //   setEditSubjectId(subject.idSubject);
//   //   setEditSubjectCode(subject.idSubject);
//   // };
//   const handleEditClick = (subject) => {
//     setEditSubjectId(subject.idSubject);
//     setEditFormData({
//       idSubject: subject.idSubject,
//       SubjectName: subject.SubjectName,
//       SubjectNameEnglish: subject.SubjectNameEnglish,
//       // Add other fields here if needed
//     });
//   };
//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData({
//       ...editFormData,
//       [name]: value,
//     });
//   };

//   // const handleSaveClick = (subjectId) => {
//   //   // Implement the save functionality here
//   //   // For example, send a PATCH request to your backend server:
//   //   fetch(`http://localhost:3100/subjects1/${subjectId}`, {
//   //     method: 'PATCH',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ idSubject: editSubjectCode }),
//   //   })
//   //   .then(response => {
//   //     if (!response.ok) throw new Error('Error updating subject');
//   //     // Re-fetch the subjects or update the state accordingly
//   //     setEditSubjectId(null);
//   //   })
//   //   .catch(error => console.error('Error:', error));
//   // };
//   const handleSaveClick = () => {
//     // Implement the save functionality here
//     // For example, send a PATCH request to your backend server:
//     fetch(`http://localhost:3100/subjects1/${editFormData.idSubject}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(editFormData),
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Error updating subject');
//       // Re-fetch the subjects or update the state accordingly
//       setEditSubjectId(null);
//       // Refresh your subjects data here
//     })
//     .catch(error => console.error('Error:', error));
//   };

//   const renderRow = (subject, grade,index) => {
//     const isEditing = editSubjectId === subject.idSubject;
    
//     return (

//       // <tr key={subject.idSubject}>

//       //   {isEditing ? (
//       //     <td>
//       //       <input
//       //         type="text"
//       //         value={editSubjectCode}
//       //         onChange={(e) => setEditSubjectCode(e.target.value)}
//       //       />
//       //       <button onClick={() => handleSaveClick(subject.idSubject)}>
//       //         <FaSave />
//       //       </button>
//       //     </td>
//       //   ) : (
//       //     <>
//       //       <td>{subject.idSubject}</td>
//       //     </>
//       //   )}

    

//       //   <td>{subject.SubjectName}</td>
//       //   <td>{subject.SubjectNameEnglish}</td>
//       //   <td>{subject.StudentGrade_idStudentGrade}</td>
//       //   <td>{subject.Preq}</td>
//       //   <button onClick={() => onDelete(subject.idSubject)}>
//       //     <FaTrash />
//       //   </button>
//       //   <button onClick={() => handleEditClick(subject)}>
//       //         <FaEdit />
//       //       </button>
//       // </tr>
//       <tr key={`${subject.idSubject}-${index}`}> {/* ใช้คีย์ที่ไม่ซ้ำที่นี่ */}
//         {isEditing ? (
//           <>
//             <td>
//               <input
//                 type="text"
//                 name="idSubject"
//                 value={editFormData.idSubject}
//                 onChange={handleEditFormChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="SubjectName"
//                 value={editFormData.SubjectName}
//                 onChange={handleEditFormChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="SubjectNameEnglish"
//                 value={editFormData.SubjectNameEnglish}
//                 onChange={handleEditFormChange}
//               />
//             </td>
//             {/* Add inputs for other editable fields */}
//             <td>
//               <button onClick={handleSaveClick}>
//                 <FaSave />
//               </button>
//             </td>
//           </>
//         ) : (
//           <>
//             <td onClick={() => handleEditClick(subject)}>{subject.idSubject}</td>
//             <td onClick={() => handleEditClick(subject)}>{subject.SubjectName}</td>
//             <td>{subject.SubjectNameEnglish}</td>
//             {/* Add other fields here */}
//             <td>
//               <button onClick={() => handleEditClick(subject)}>
//                 <FaEdit />
//               </button>
//             </td>
//           </>
//         )}
//         <td>
//           {/* Delete button */}
//           <button>
//             <FaTrash />
//           </button>
//         </td>
//       </tr>
      

//     );
//   };

//   return (
//     <>
//       <div>
//         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 11</h5>
//         <table>
//           {/* Table headers and body for subjects11 */}
//           <tbody>
//             {subjects11.map((subject) => renderRow(subject, 11))}
//           </tbody>
//         </table>

//         <h5>หลักสูตรปีการศึกษา 2560 - StudentGrade 12</h5>
//         <table>
//           {/* Table headers and body for subjects12 */}
//           <tbody>
//             {subjects12.map((subject) => renderRow(subject, 12))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default EditSub;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import './Table.css';


// function EditSub({ course, onEdit }){

//     const handleDelete = () => {
//         if (window.confirm(`คุณต้องการลบวิชา ${course.name} หรือไม่?`)) {
//           onDelete(course.id);
//         }
//       }
//       const onDelete = (courseId) => {
//         fetch(`http://localhost:3100/courses/${courseId}`, { method: 'DELETE' })
//           .then(response => {
//             if (!response.ok) throw new Error('Error deleting course');
//             // ลบข้อมูลวิชาออกจาก state หรือเรียกใช้งาน API เพื่อโหลดข้อมูลใหม่
//           })
//           .catch(error => console.error('Error:', error));
//       };
//     const [subjects11, setSubjects11] = useState([]);
//     const [subjects12, setSubjects12] = useState([]);

//     // โหลดข้อมูลเมื่อ component ถูก mount
//     useEffect(() => {
//     // ดึงข้อมูลสำหรับ StudentGrade 11
//     fetch('http://localhost:3100/subjects/11')
//         .then(response => response.json())
//         .then(data => setSubjects11(data));

//     // ดึงข้อมูลสำหรับ StudentGrade 12
//     fetch('http://localhost:3100/subjects/12')
//         .then(response => response.json())
//         .then(data => setSubjects12(data));
//     }, []);
    
//     return(
//         <>
//         <div>
//         <div>
//         <table className="styled-table">
//         <thead>
//           <tr>
//             <th>รหัสวิชา</th>
//             <th>ชื่อวิชา</th>
//             <th>ชื่อวิชาภาษาอังกฤษ</th>
//             <th>ชั้นปี</th>
//             <th>วิชาพื้นฐาน</th>
            
//             {/* และอื่นๆ ตามที่ต้องการ */}
//           </tr>
//         </thead>
//         <tbody>
//           {subjects11.map(subject => (
//             <tr key={subject.id}>
//                 <FaEdit  />            
//                 <button onClick={() => onDelete(subject.idSubject)}> <FaTrash /></button>

//               <td>{subject.idSubject}</td>
//               <td>{subject.SubjectName}</td>
//               <td>{subject.SubjectNameEnglish}</td> 
//               <td>{subject.StudentGrade_idStudentGrade}</td>
//               <td>{subject.Preq}</td>
//               {/* และอื่นๆ ตามที่ต้องการ */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//         </div>
        
        
//         <div>
//         <table className="styled-table">
//         <thead>
//           <tr>
            
//             <th>รหัสวิชา</th>
//             <th>ชื่อวิชา</th>
//             <th>ชื่อวิชาภาษาอังกฤษ</th>
//             <th>ชั้นปี</th>
//             <th>วิชาพื้นฐาน</th>
            
//             {/* และอื่นๆ ตามที่ต้องการ */}
//           </tr>
//         </thead>
//         <tbody>
//           {subjects12.map(subject => (
//             <tr key={subject.id}>
//                 <FaEdit  />
//                 <button onClick={() => onDelete(subject.idSubject)}> <FaTrash /></button>
//               <td>{subject.idSubject}</td>
//               <td>{subject.SubjectName}</td>
//               <td>{subject.SubjectNameEnglish}</td> 
//               <td>{subject.StudentGrade_idStudentGrade}</td>
//               <td>{subject.Preq}</td>
              
              
//               {/* และอื่นๆ ตามที่ต้องการ */}
//             </tr>
            
//           ))}
//         </tbody>
//       </table>
//         </div>
//     </div>
        
//         </>
//     )
// }

// export default EditSub

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaSave ,FaTimes} from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import './Table.css';

function EditSub() {
  const [subjects11, setSubjects11] = useState([]);
  const [subjects12, setSubjects12] = useState([]);

  const [subjects21, setSubjects21] = useState([]);
  const [subjects22, setSubjects22] = useState([]);

  const [subjects31, setSubjects31] = useState([]);
  const [subjects32, setSubjects32] = useState([]);

  const [subjects41, setSubjects41] = useState([]);
  const [subjects42, setSubjects42] = useState([]);

  const [editSubjectId, setEditSubjectId] = useState(null);
  
  const [addingSubject, setAddingSubject] = useState(false);
  const [newSubjectFormData, setNewSubjectFormData] = useState({
    idSubject: '',
    SubjectName: '',
    SubjectNameEnglish: '',
    Credits: '',
    Preq: '',
    CourseYear_idCourseYear: '',
    StudentGrade_idStudentGrade: '',
    Type: '',
  });
  
  const [editFormData, setEditFormData] = useState({
    idSubject: '',
    SubjectName: '',
    SubjectNameEnglish: '',
    Credits:'',
    Preq:'',
    CourseYear_idCourseYear:'',
    StudentGrade_idStudentGrade:'',
    Type:'',
    
    // Add other fields here if needed
  });

  
  

  const { idCourseYear } = useParams(); // รับ idCourseYear จาก URL
  const academicYear = parseInt(idCourseYear) + 2500;
  useEffect(() => {
    fetch(`http://localhost:3100/subjects/11/${idCourseYear}`)
        .then(response => response.json())
        .then(data => {
            console.log('Grade 11 Subjects:', data);
            setSubjects11(data);
        });

    fetch(`http://localhost:3100/subjects/12/${idCourseYear}`)
        .then(response => response.json())
        .then(data => {
            console.log('Grade 12 Subjects:', data);
            setSubjects12(data);
        });
    fetch(`http://localhost:3100/subjects/21/${idCourseYear}`)
    .then(response => response.json())
    .then(data => {
        console.log('Grade 21 Subjects:', data);
        setSubjects21(data);
    });

    fetch(`http://localhost:3100/subjects/22/${idCourseYear}`)
        .then(response => response.json())
        .then(data => {
            console.log('Grade 22 Subjects:', data);
            setSubjects22(data);
        });

    fetch(`http://localhost:3100/subjects/31/${idCourseYear}`)
    .then(response => response.json())
    .then(data => {
        console.log('Grade 31 Subjects:', data);
        setSubjects31(data);
    });

    fetch(`http://localhost:3100/subjects/32/${idCourseYear}`)
    .then(response => response.json())
    .then(data => {
        console.log('Grade 32 Subjects:', data);
        setSubjects32(data);
    });


    fetch(`http://localhost:3100/subjects/41/${idCourseYear}`)
    .then(response => response.json())
    .then(data => {
        console.log('Grade 41 Subjects:', data);
        setSubjects41(data);
    });

    fetch(`http://localhost:3100/subjects/42/${idCourseYear}`)
    .then(response => response.json())
    .then(data => {
        console.log('Grade 42 Subjects:', data);
        setSubjects42(data);
    });


}, []);


const handleNewSubjectFormChange = (e) => {
  const { name, value } = e.target;
  setNewSubjectFormData(prevFormData => ({
    ...prevFormData,
    [name]: value
  }));
};
//ลบ
const handleDeleteSubject = (subject) => {
  const subjectId = subject.idSubject; // หรืออาจจะเป็น subject.id ขึ้นอยู่กับสถานะของอ็อบเจกต์ subject

  if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบรายวิชา ${subject.SubjectName}?`)) {
    fetch(`http://localhost:3100/subjectsdel/${subjectId}`, {
      method: 'DELETE',
      // คุณอาจจะต้องส่ง headers เช่น Content-Type หรือ Authorization ขึ้นอยู่กับ API ของคุณ
    })
    .then(response => {
      if (!response.ok) throw new Error('Error deleting subject');
      // อัพเดท state ที่นี่เพื่อยกเลิกการแสดงรายวิชาที่ถูกลบ
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
};



//handleSaveNewSubject  insert
const handleAddNewSubject = () => {
  // สมมติว่า `newSubjectFormData` เป็น state ที่เก็บข้อมูลของฟอร์มรายวิชาใหม่
  fetch(`http://localhost:3100/subjectsinset`, { // อาจต้องปรับ URL ให้ตรงกับ endpoint สำหรับเพิ่มรายวิชาใน API ของคุณ
    method: 'POST', // ใช้ method POST สำหรับการเพิ่มข้อมูลใหม่
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSubjectFormData), // ส่งข้อมูลรายวิชาใหม่ในรูปแบบ JSON
  })
  .then(response => {
    if (!response.ok) throw new Error('Error adding new subject');
    // หลังจากเพิ่มรายวิชาใหม่สำเร็จ, คุณอาจต้องการอัปเดต state ของ subjects หรือทำการ clear ฟอร์ม
    setAddingSubject(false); // หรือการจัดการ state อื่นๆ ตามที่ต้องการ
    window.location.reload();
    // ตัวอย่าง: รีเฟทช์รายการรายวิชาใหม่ที่เพิ่ม
  })
  .catch(error => console.error('Error:', error));
};

const handleCancelAdd = () => {
  setAddingSubject(false);
  // ตั้งค่าฟอร์มการเพิ่มรายวิชาใหม่กลับเป็นค่าเริ่มต้น
  setEditFormData({
    idSubject: '',
    SubjectName: '',
    SubjectNameEnglish: '',
    Credits: '',
    Preq: '',
    CourseYear_idCourseYear: '',
    StudentGrade_idStudentGrade: '',
    Type: '',
  });
};
  const handleEditClick = (subject) => {
    setEditSubjectId(subject.idSubject);
    setEditFormData({
      idSubject: subject.idSubject,
      SubjectName: subject.SubjectName,
      SubjectNameEnglish: subject.SubjectNameEnglish,
      
      Credits:subject.Credits,
      Preq:subject.Preq,
      CourseYear_idCourseYear:subject.CourseYear_idCourseYear,
      StudentGrade_idStudentGrade:subject.StudentGrade_idStudentGrade,
      Type:subject.Type,
      // Add other fields here if needed
    });
  };
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
  
    // ตรวจสอบและแปลงค่าสำหรับ idSubject
    const updatedValue = name === 'idSubject' ? parseInt(value, 10) || 0 : value;
  
    console.log(`Field: ${name}, Value: ${updatedValue}`); // สำหรับการตรวจสอบ
  
    setEditFormData(prevFormData => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };
  

  const handleSaveClick = () => {
    // Implement the save functionality here
    // For example, send a PATCH request to your backend server:
    fetch(`http://localhost:3100/subjects1/${editFormData.idSubject}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData),
    })
    .then(response => {
      if (!response.ok) throw new Error('Error updating subject');
      // Re-fetch the subjects or update the state accordingly
      window.location.reload();
      setEditSubjectId(null);
      // Refresh your subjects data here
    })
    
    .catch(error => console.error('Error:', error));
  };

  
  const renderRow = (subject, grade,index) => {
    const isEditing = editSubjectId === subject.idSubject;
    
    return (
      <tr key={`${subject.idSubject}-${index}`}> {/* ใช้คีย์ที่ไม่ซ้ำที่นี่ */}
        {isEditing ? (
          <>
            <td>
              <input
                type="text"
                name="idSubject"
                value={editFormData.idSubject}
                onChange={handleEditFormChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="SubjectName"
                value={editFormData.SubjectName}
                onChange={handleEditFormChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="SubjectNameEnglish"
                value={editFormData.SubjectNameEnglish}
                onChange={handleEditFormChange}
              />
            </td>
            {/* Add inputs for other editable fields */}
            <td>
              <input
                type="text"
                name="Credits"
                value={editFormData.Credits}
                onChange={handleEditFormChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Preq"
                value={editFormData.Preq}
                onChange={handleEditFormChange}
              />
            </td>
           
            <td>
              <input
                type="text"
                name="Type"
                value={editFormData.Type}
                onChange={handleEditFormChange}
              />
            </td>
            <td>
              <button onClick={handleSaveClick}>
                <FaSave />
              </button>
            </td>
            
          </>
        ) : (
          <>
          
          
            <td onClick={() => handleEditClick(subject)}>{subject.idSubject}</td>
            {/* <td onClick={() => handleEditClick(subject)}>{subject.SubjectName}</td> */}
           
            <td>{subject.SubjectName}</td>
            <td>{subject.SubjectNameEnglish}</td>
            <td>{subject.Credits}</td>
            <td>{subject.Preq}</td>
            
            <td>{subject.Type}</td>
            
            {/* Add other fields here */}
            <td>
              <button onClick={() => handleEditClick(subject)}>
                <FaEdit />
              </button>
            </td>         
          </>       
        )}    
        <td>
          {/* Delete button */}
          <button onClick={() =>handleDeleteSubject(subject)}>
            <FaTrash />
          </button>
        </td>

                  


      </tr>
      
    );
  };
  

  return (
    <>
      
      <div className="EditSub">
      <div className="subject-container">
        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่1 ภาคการศึกษาที่1</h5>
        <table className="subject-table">
        <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          {/* Table headers and body for subjects11 */}
          <tbody>
            {subjects11.map((subject) => renderRow(subject, 11))}
          </tbody>
        </table>
        
        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่1 ภาคการศึกษาที่2</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects12.map((subject) => renderRow(subject, 12))}
          </tbody>
        </table>

        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่2 ภาคการศึกษาที่1</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects21.map((subject) => renderRow(subject, 21))}
          </tbody>
        </table>

        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่2 ภาคการศึกษาที่2</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects22.map((subject) => renderRow(subject, 22))}
          </tbody>
        </table>

        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่3 ภาคการศึกษาที่1</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects31.map((subject) => renderRow(subject, 31))}
          </tbody>
        </table>


        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่3 ภาคการศึกษาที่2</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects32.map((subject) => renderRow(subject, 32))}
          </tbody>
        </table>

        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่4 ภาคการศึกษาที่1</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects41.map((subject) => renderRow(subject, 41))}
          </tbody>
        </table>

        <h5>หลักสูตรปีการศึกษา {academicYear} - ปีที่4 ภาคการศึกษาที่2</h5>
        <table className="subject-table">
          {/* Table headers and body for subjects12 */}
          <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชาภาษาไทย</th>
            <th>ชื่อวิชาภาษาอังกฤษ</th>
            <th>หน่วยกิต</th>
            <th>รายวิชาที่ต้องเรียนมาก่อน</th>
            <th>วิชาพื้นฐาน</th>
          </tr>
        </thead>
          <tbody>
            {subjects42.map((subject) => renderRow(subject, 42))}
          </tbody>
        </table>


        {addingSubject ? (
                    // ฟอร์มสำหรับเพิ่มรายวิชาใหม่
                    <div>
                      <td>
                          <input
                            type="text"
                            name="idSubject"
                            placeholder="รหัสวิชา"
                            value={newSubjectFormData.idSubject}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="SubjectName"
                            placeholder="ชื่อวิชา"
                            value={newSubjectFormData.SubjectName}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="SubjectNameEnglish"
                            placeholder="ชื่อวิชาภาษาอังกฤษ"
                            value={newSubjectFormData.SubjectNameEnglish}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        {/* ทำเช่นเดียวกันสำหรับ fields อื่นๆ */}
                        <td>
                          <input
                            type="text"
                            name="Credits"
                            placeholder="หน่วยกิต"
                            value={newSubjectFormData.Credits}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="Preq"
                            placeholder="วิชาเรียกเข้า"
                            value={newSubjectFormData.Preq}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="CourseYear_idCourseYear"
                            placeholder="ปีการศึกษาของวิชา"
                            value={newSubjectFormData.CourseYear_idCourseYear}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="StudentGrade_idStudentGrade"
                            placeholder="ระดับชั้นที่เรียน"
                            value={newSubjectFormData.StudentGrade_idStudentGrade}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="Type"
                            placeholder="ประเภทวิชา"
                            value={newSubjectFormData.Type}
                            onChange={handleNewSubjectFormChange}
                          />
                        </td>
                      <button onClick={handleAddNewSubject}>
                        <FaSave /> บันทึก
                      </button>
                      <button onClick={handleCancelAdd}><FaTimes /> ยกเลิก</button>
                    </div>
                  ) : (
                    // ปุ่มสำหรับเริ่มการเพิ่มรายวิชาใหม่
                    <button onClick={() => setAddingSubject(true)}>
                      <FaPlus /> เพิ่มรายวิชาใหม่
                    </button>
                    
                  )}

        </div>
      </div>
    </>
  );
}

export default EditSub;