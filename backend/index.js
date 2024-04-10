const express = require('express'); //เรียกใช้ express ผ่าน require
const session = require('express-session');
const myApp = express(); //สร้างตัวแปร myApp เพื่อใช้งาน express 
const port = 3100; //พอร์ตของ Server ที่ใช้ในการเปิด Localhost 
const cors = require('cors'); // ใช้ login
const mysql = require('mysql')
const multer = require('multer');
const xlsx = require('xlsx');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

conn.connect(error => {
  if (error) {
    console.log(error);
  } else {
    const sql = "DELETE FROM `userdetail`"; // Query to delete all data from userdetail table
  
  conn.query(sql, (error, results) => {
    if (error) {
      console.log("Error deleting User data:", error);
    } else {
      console.log("all User data deleted successfully on startup");
    }
  });
    console.log("MySQL Connected!");
  }
});

myApp.use(express.json());
myApp.use(cors({
  origin: 'http://localhost:5173'
}));

myApp.get("/", (request,response) =>{
    var sql = "SELECT * from subject "

    conn.query(sql, function(error,results,fiels){
        if (error){
            console.log(error)
        } else{
            response.json({data:results})
        }
    })
})


  myApp.get('/subjects/11/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params;
    const idStudentGrade = 11; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด
  
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
    
  myApp.get('/subjects/12/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 12; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  myApp.get('/subjects/21/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 21; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  myApp.get('/subjects/22/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 22; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  myApp.get('/subjects/31/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 31; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  myApp.get('/subjects/32/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 32; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  
  myApp.get('/subjects/41/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 41; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  
  myApp.get('/subjects/42/:idCourseYear', (req, res) => {
    const { idCourseYear } = req.params; // รับ idCourseYear จาก URL parameter
    const idStudentGrade = 42; // กำหนด idStudentGrade เป็น 12 โดยตรง
  
    // ใช้ parameters ทั้งสองใน query ของคุณ
    const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
    conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while fetching data');
      }
      res.json(results);
    });
  });
  myApp.delete('/subjectsdel/:id', (req, res) => {
    const { id } = req.params;
  
    const sql = 'DELETE FROM subject WHERE idSubject = ?';
  
    conn.query(sql, [id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error deleting the subject');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('No subject found with the given ID');
      }
      res.status(200).send('Subject deleted successfully');
    });
  });
myApp.post('/subjectsinset', (req, res) => {
    const { 
      idSubject, 
      SubjectName, 
      SubjectNameEnglish, 
      Credits, 
      Preq, 
      CourseYear_idCourseYear, 
      StudentGrade_idStudentGrade, 
      Type 
    } = req.body;
  
    const sql = `
      INSERT INTO subject 
      (idSubject, SubjectName, SubjectNameEnglish, Credits, Preq, CourseYear_idCourseYear, StudentGrade_idStudentGrade, Type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    conn.query(sql, [
      idSubject, 
      SubjectName, 
      SubjectNameEnglish, 
      Credits, 
      Preq, 
      CourseYear_idCourseYear, 
      StudentGrade_idStudentGrade, 
      Type
    ], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error adding the subject');
      }
      res.send('Subject added successfully');
    });
  });
  //อันนี้อัพเดท หรือว่า การ อัพเดทรายวิชา
  myApp.patch('/subjects1/:id', (req, res) => {
    const { id } = req.params;
    const { idSubject, SubjectName, SubjectNameEnglish,Credits,Preq ,Type } = req.body; // ปรับแต่งตามข้อมูลที่คุณต้องการอัปเดต

    const sql = `
      UPDATE subject 
      SET idSubject = ?, SubjectName = ?, SubjectNameEnglish = ?, Credits = ?, Preq = ?,   Type = ?  WHERE idSubject = ?`;
    
    // ทำการเชื่อมต่อกับฐานข้อมูลและอัปเดต
    conn.query(sql, [idSubject, SubjectName, SubjectNameEnglish, Credits, Preq, Type, id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error updating the subject');
        }
        res.send('Subject updated successfully');
    });
  });
  
myApp.get('/subjects', (req, res) => {
    const sql = 'SELECT * FROM subject ';
    conn.query(sql, (error, results) => {
      if (error) {
        console.error('An error occurred while fetching data');
        res.status(500).send('An error occurred while fetching data');
        throw error;
      }
      res.json(results);
    });
  });
// อันนี้ทำไรไม่ได้ ลบปีการศึกษา
myApp.delete('/course/:courseYear', (req, res) => {
  const { courseYear } = req.params;
  const sql = 'DELETE FROM courseyear WHERE idCourseYear = ?';
  const sqlsuj = 'DELETE FROM subject WHERE CourseYear_idCourseYear = ?';

  // สร้าง transaction
  conn.beginTransaction((err) => {
      if (err) { 
          return res.status(500).send('Error starting transaction');
      }

      conn.query(sqlsuj, [courseYear], (error, results) => {
          if (error) {
              return conn.rollback(() => {
                  res.status(500).send('Error deleting course data');
              });
          }

          conn.query(sql, [courseYear], (error, results) => {
              if (error) {
                  return conn.rollback(() => {
                      res.status(500).send('Error deleting subject data');
                  });
              }

              // ถ้าทุกอย่างเรียบร้อย, commit transaction
              conn.commit((err) => {
                  if (err) {
                      return conn.rollback(() => {
                          res.status(500).send('Error committing transaction');
                      });
                  }
                  res.send(`Course data and related subjects for year ${courseYear} deleted successfully`);
              });
          });
      });
  });
});
// ดึงขอ้มูลปีหลักสูตร
myApp.get('/courseyear', (req, res) => {
  const sql = 'SELECT * FROM courseyear';
  conn.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching course years:', error);
      return res.status(500).send('Error fetching courses');
    }
    console.log('Course years fetched:', results);
    res.json(results);
  });
});

myApp.get('/ssm', (req, res) => {
  const sql = 'SELECT * FROM subject';
  conn.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching course years:', error);
      return res.status(500).send('Error fetching courses');
    }
    console.log('Course years fetched:', results);
    res.json(results);
  });
});


//อันนี้ลบ
myApp.delete('/courses/:id', (req, res) => {
const { id } = req.params;
const sql = 'DELETE FROM subject WHERE idSubject = ?';
conn.query(sql, [id], (error, results) => {
    if (error) {
    return res.status(500).send('Error deleting course');
    }
    res.send('Course deleted successfully');
});
});

myApp.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      if (data.length === 0) {
          return res.status(400).send('No data found in the uploaded file');
      }

      // Function to pad ID with leading zeros
      function padWithLeadingZeros(id, length) {
          let idStr = id.toString();
          while (idStr.length < length) {
              idStr = '0' + idStr;
          }
          return idStr;
      }

      // Declare sqlQuery using let instead of const to allow modification
      let sqlQuery = 'INSERT INTO subject (SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Credits, Type, Preq, StudentGrade, Major) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const dataInsert = [];

      data.forEach((value, index) => {
          if (index !== 0) {
              sqlQuery += ', (?, ?, ?, ?, ?, ?, ?, ?, ?)';
          }
          const paddedIdSubject = padWithLeadingZeros(value.SubjectCode, 9);
          dataInsert.push(
              paddedIdSubject,
              value.SubjectCode,
              value.SubjectName,
              value.SubjectNameEnglish,
              value.CourseYear,
              value.Credits,
              value.Type,
              value.Preq,
              value.StudentGrade,
              value.Major
              
          );
      });

      conn.query('SELECT * FROM subject WHERE SubjectCode = ?', [paddedIdSubject], (err, results) => {
        if (err) {
            reject(err);
        } else if (results.length === 0) {
            // If the subject does not exist, insert it into the subject table
            conn.query('INSERT INTO subject (SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Credits, Type, Preq, StudentGrade, Major) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [paddedIdSubject,
              value.SubjectCode,
              value.SubjectName,
              value.SubjectNameEnglish,
              value.CourseYear,
              value.Credits,
              value.Type,
              value.Preq,
              value.StudentGrade,
              value.Major], 
              (insertErr, insertResult) => {
                if (insertErr) {
                    reject(insertErr);
                } else {
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
    
  } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing file');
  }
});




myApp.delete('/deleteUpload', async (req, res) => {
  try {
      // Delete all data from the 'subject' table
      const deleteQuery = 'DELETE FROM subject';
      conn.query(deleteQuery, (error, results) => {
          if (error) {
              console.error('Error deleting uploaded data:', error);
              return res.status(500).send('Error deleting uploaded data');
          }
          console.log('Uploaded data deleted successfully');
          res.status(200).send('Uploaded data deleted successfully');
      });
  } catch (error) {
      console.error('Error deleting uploaded data:', error);
      res.status(500).send('Error deleting uploaded data');
  }
});

myApp.use(bodyParser.json());



// Login endpoint
myApp.post('/LoginPage/:idUser/:userName/:role', async (req, res) => {
  const { idUser, userName, role } = req.params;
  console.log('Received login request:', email);
  var sql ="INSERT INTO userDetail (idUser, userName, role) VALUES (?,?,?)";
  try{
    conn.query(sql,[idUser, userName, role],(er,result) =>{
      if(er){
        console.log(er);
      }else{
        res.send('succesful');
      }
    })
  }catch(er){
    console.log(er)
  }
  
});

myApp.get("/subjectschedule/:teacherID", (request, response) => {
  const {teacherID} = request.params;
  var sql ="SELECT * FROM `subjectschedule` WHERE TeacherInfo_idTeacherID = ?";

  conn.query(sql,[teacherID], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

myApp.get("/subjectschedule/:idSubject", (request, response) => {
  const {idSubject} = request.params;
  var sql ="SELECT * FROM `subject` WHERE idSubject = ?";

  conn.query(sql,[idSubject], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});





myApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.send('Something broke!');
});

console.log('About to start the server');
myApp.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});

myApp.get("/userdetail/logout/:id", (request, response) => {
  const { id } = request.params;
  var sql =
  "DELETE FROM `userdetail` WHERE idUser=?;";

  conn.query(sql, [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

myApp.get("/userdetail", (request, response) => {
  var sql ="SELECT * FROM `userdetail`";

  conn.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

myApp.get("/userdetail/:id/:username/:role", (request, response) => {
  const { id,username,role } = request.params;
  var sql =
  "INSERT INTO `userdetail` (`idUser`, `UserName`, `Role`) VALUES (?, ?, ?);";
    

  conn.query(sql, [id,username,role], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

myApp.get("/Login/:email/:password", (request, response) => {
  const { email,password } = request.params;
  conn.query('SELECT TeacherName,Role,idTeacher FROM teacherinfo WHERE TeacherEmail = ? and TeacherPassword = ?', [email,password], (err, results) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Internal server error" });
    }else {
      response.send(results);
    }
  });
});

myApp.get("/gaeDat/:id", (request, response) => {
  const { id } = request.params;
  conn.query('SELECT * FROM teacherinfo WHERE idTeacherID = ? ', [id], (err, results) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Internal server error" });
    }else {
      response.send(results);
    }
  });
});

myApp.get("/SubjectTable", (request,response) =>{
  var sql = "SELECT subjectschedule.Subject_idSubject, subjectschedule.Subject_CourseYear_idCourseYear, subjectschedule.TimeSlot_idTimeSlot, subjectschedule.TimeSlot_Day_idDay, " +
  "subjectschedule.StudentGrade_idStudentGrade, subjectschedule.StudentGrade_Major_idMajor, subjectschedule.Sec_idSec,sec.Sec,sec.StuNum, subjectschedule.TeacherInfo_idTeacherID, teacherinfo.TeacherName,teacherinfo.TeacherSurname, " +
  "subject.SubjectName, subject.SubjectNameEnglish, subject.Credits, subject.Preq, subject.Type " +
  "FROM subjectschedule " +
  "INNER JOIN subject ON subjectschedule.Subject_idSubject = subject.idSubject " +
  "INNER JOIN sec ON subjectschedule.Sec_idSec = sec.idSec " +
  "INNER JOIN teacherinfo ON subjectschedule.TeacherInfo_idTeacherID = teacherinfo.idTeacherID;";
  
  conn.query(sql, function(error,results){
      if (error){
          console.log(error)
      } else{
          response.json(results)
      }
  })
})
//

//

myApp.get("/SubjectTable/:Day/:Time", (request, response) => {
  const { Day,Time } = request.params;
  var sql =
    "SELECT Subject_idSubject, Subject_CourseYear_idCourseYear, TimeSlot_idTimeSlot, TimeSlot_Day_idDay, " +
    "StudentGrade_idStudentGrade, StudentGrade_Major_idMajor, Sec_idSec, TeacherInfo_idTeacherID " +
    "FROM subjectschedule " +
    "WHERE TimeSlot_Day_idDay = ?"+
    "and TimeSlot_idTimeSlot=?";
    

  conn.query(sql, [Day,Time], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

myApp.get("/TeacherSubject", (request,response) =>{
  var sql = "SELECT subjectschedule.Subject_idSubject, subjectschedule.Subject_CourseYear_idCourseYear, subjectschedule.TimeSlot_idTimeSlot, subjectschedule.TimeSlot_Day_idDay, " +
  "subjectschedule.StudentGrade_idStudentGrade, subjectschedule.StudentGrade_Major_idMajor, subjectschedule.Sec_idSec,sec.Sec,sec.StuNum, subjectschedule.TeacherInfo_idTeacherID, teacherinfo.TeacherName,teacherinfo.TeacherSurname, " +
  "subject.SubjectName, subject.SubjectNameEnglish, subject.Credits, subject.Preq, subject.Type " +
  "FROM subjectschedule " +
  "INNER JOIN subject ON subjectschedule.Subject_idSubject = subject.idSubject " +
  "INNER JOIN sec ON subjectschedule.Sec_idSec = sec.idSec " +
  "INNER JOIN teacherinfo ON subjectschedule.TeacherInfo_idTeacherID = teacherinfo.idTeacherID;";
  
  conn.query(sql, function(error,results){
      if (error){
          console.log(error)
      } else{
          response.json(results)
      }
  })
})

//จัดรายเทอม1
myApp.get('/subjects/111/:idCourseYear', (req, res) => {
  const { idCourseYear } = req.params;
  const idStudentGrade = 11; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด

  const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
  conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
    if (error) {
      return res.status(500).send('An error occurred while fetching data');
    }
    res.json(results);
  });
});


myApp.get('/subjects/121/:idCourseYear', (req, res) => {
  const { idCourseYear } = req.params;
  const idStudentGrade = 21; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด

  const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
  conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
    if (error) {
      return res.status(500).send('An error occurred while fetching data');
    }
    res.json(results);
  });
});

myApp.get('/subjects/131/:idCourseYear', (req, res) => {
  const { idCourseYear } = req.params;
  const idStudentGrade = 31; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด

  const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
  conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
    if (error) {
      return res.status(500).send('An error occurred while fetching data');
    }
    res.json(results);
  });
});

myApp.get('/subjects/141/:idCourseYear', (req, res) => {
  const { idCourseYear } = req.params;
  const idStudentGrade = 41; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด

  const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ? AND CourseYear_idCourseYear = ?';
  conn.query(sql, [idStudentGrade, idCourseYear], (error, results) => {
    if (error) {
      return res.status(500).send('An error occurred while fetching data');
    }
    res.json(results);
  });
});

//เทอม2



//แอดรายวิขาที่จะเปิดสอน
myApp.get('/subjects/30/:idSubject', (req, res) => {
  const { idCourseYear } = req.params;
  const { idSubject } = req.params;
  const idStudentGrade = 11; // กำหนด idStudentGrade เป็น 11 โดยตรงในโค้ด

  const sql = 'SELECT * FROM subject WHERE StudentGrade_idStudentGrade = ?  AND idSubject= ?';
  conn.query(sql, [idStudentGrade, idSubject], (error, results) => {
    if (error) {
      return res.status(500).send('An error occurred while fetching data');
    }
    res.json(results);
  });
});


//แอดรายวิชาที่จัดเสดแล้ว
myApp.post('/addSubjectSchedule', (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO SubjectSchedule (
      TeacherInfo_idTeacherID,
      Subject_idSubject,
      Subject_CourseYear_idCourseYear,
      TimeSlot_idTimeSlot,
      TimeSlot_Day_idDay,
      StudentGrade_idStudentGrade,
      StudentGrade_Major_idMajor,
      Sec_idSec,
      LabRoom_idLabRoom,
      IsSpecial
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.idTec,
    data.idSubject,
    data.couseryer,
    data.time,
    data.timeday,
    data.stug,
    data.major,
    data.sec,
    // สมมติว่าไม่มีข้อมูลสำหรับ LabRoom_idLabRoom ให้ใช้ NULL
    null,
    // สมมติว่าไม่มีข้อมูลสำหรับ IsSpecial ให้ใช้ค่า 0 หรือ false
    0
  ];

  conn.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting subject schedule:', error);
      res.status(500).send('Error inserting subject schedule');
    } else {
      res.status(201).send({ idSubjectSchedule: results.insertId, message: 'Subject schedule added successfully.' });
    }
  });
});


myApp.post('/your-endpoint', (req, res) => {
  const { numGroups, studentsPerGroup } = req.body;

  // รับและตรวจสอบค่าที่ส่งมา
  if (!numGroups || !studentsPerGroup) {
    return res.status(400).send('Missing numGroups or studentsPerGroup');
  }

  // สร้างหมู่เรียนใหม่
  const newGroups = [];
  for (let i = 0; i < numGroups; i++) {
    newGroups.push([
      studentsPerGroup, // StuNum
      800 + i,         // secNumber
    ]);
  }

  // ทำการบันทึกข้อมูลใหม่ลงในตาราง sec
  const sql = 'INSERT INTO sec (StuNum, Sec) VALUES ?';
  conn.query(sql, [newGroups], (error, results, fields) => {
    if (error) {
      console.error('Error inserting new groups:', error);
      return res.status(500).send('Error inserting new groups');
    }
    res.status(201).send({ message: 'New groups created successfully', data: results });
  });
});




myApp.get("/TeacherSubjectSec/:idTeacherID", (request,response) =>{
  const { idTeacherID } = request.params;
  var sql = "SELECT subjectschedule.Subject_idSubject, subjectschedule.Subject_CourseYear_idCourseYear, subjectschedule.TimeSlot_idTimeSlot, subjectschedule.TimeSlot_Day_idDay, " +
  "subjectschedule.StudentGrade_idStudentGrade, subjectschedule.StudentGrade_Major_idMajor, subjectschedule.Sec_idSec, sec.Sec, sec.StuNum, subjectschedule.TeacherInfo_idTeacherID, teacherinfo.TeacherName, teacherinfo.TeacherSurname, " +
  "subject.SubjectName, subject.SubjectNameEnglish, subject.Credits, subject.Preq, subject.Type " +
  "FROM subjectschedule " +
  "INNER JOIN subject ON subjectschedule.Subject_idSubject = subject.idSubject " +
  "INNER JOIN sec ON subjectschedule.Sec_idSec = sec.idSec " +
  "INNER JOIN teacherinfo ON subjectschedule.TeacherInfo_idTeacherID = teacherinfo.idTeacherID " +
  "WHERE subjectschedule.TeacherInfo_idTeacherID = ?;"; // เพิ่ม WHERE clause เพื่อกำหนดเงื่อนไข

  conn.query(sql, [idTeacherID], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});



myApp.get("/TeacherSubjectSec1", (request,response) =>{
  const { idTeacherID } = request.params;
  var sql = "SELECT subjectschedule.Subject_idSubject, subjectschedule.Subject_CourseYear_idCourseYear, subjectschedule.TimeSlot_idTimeSlot, subjectschedule.TimeSlot_Day_idDay, " +
  "subjectschedule.StudentGrade_idStudentGrade, subjectschedule.StudentGrade_Major_idMajor, subjectschedule.Sec_idSec, sec.Sec, sec.StuNum, subjectschedule.TeacherInfo_idTeacherID, teacherinfo.TeacherName, teacherinfo.TeacherSurname, " +
  "subject.SubjectName, subject.SubjectNameEnglish, subject.Credits, subject.Preq, subject.Type " +
  "FROM subjectschedule " +
  "INNER JOIN subject ON subjectschedule.Subject_idSubject = subject.idSubject " +
  "INNER JOIN sec ON subjectschedule.Sec_idSec = sec.idSec " +
  "INNER JOIN teacherinfo ON subjectschedule.TeacherInfo_idTeacherID = teacherinfo.idTeacherID " +
  "WHERE subjectschedule.TeacherInfo_idTeacherID = ?;"; // เพิ่ม WHERE clause เพื่อกำหนดเงื่อนไข

  conn.query(sql, [idTeacherID], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      const csv = json2csv(results);
      const filename = 'TeacherSubjects.csv';

      // เขียนข้อมูล CSV ลงในไฟล์
      fs.writeFile(filename, csv, (err) => {
        if (err) {
          console.error('Error writing CSV file', err);
          response.status(500).json({ error: "Error writing CSV file" });
        } else {
          console.log('CSV file written successfully');
          // ส่งไฟล์ CSV ให้กับหน้าบ้าน
          response.download(filename);
        }
      });
    }
  });
});