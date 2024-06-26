// Importing required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const fs = require('fs');
// Initialization of express app
const myApp = express();
const port = 3100;

// Setup middleware
myApp.use(express.json());
myApp.use(cors({ origin: 'http://localhost:5173' })); 
myApp.use(bodyParser.json());

// MySQL connection setup
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to MySQL and handle initial data cleanup
conn.connect(error => {
  if (error) {
    console.error('MySQL Connection Error:', error);
  } else {
    console.log("MySQL Connected!");
  }
});

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Basic route
myApp.get("/", (request, response) => {
  const sql = "SELECT * FROM subject";
  conn.query(sql, function(error, results) {
    if (error) console.log(error);
    else response.json({ data: results });
  });
});

// Section: Import and Export Subjects
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

      // Array to store SQL queries and data for insertion
      const queries = [];
      const dataInsert = [];

      for (let i = 0; i < data.length; i++) {
          const value = data[i];
          const paddedIdSubject = padWithLeadingZeros(value.SubjectCode);
          const paddedIdCourseYear = padWithLeadingZeros(value.CourseYear);

          const query = 'SELECT * FROM mastersubject WHERE SubjectCode = ? AND CourseYear = ?';
          const queryValues = [paddedIdSubject, paddedIdCourseYear];

          queries.push(new Promise((resolve, reject) => {
              conn.query(query, queryValues, (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      if (results.length === 0) {
                          // If the subject does not exist for the given course year, insert it into the subject table
                          const insertQuery = 'INSERT INTO mastersubject (CourseYear,Major,StudentGrade,Semester,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq,Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                          const insertValues = [
                              paddedIdCourseYear,
                              value.Major,
                              value.StudentGrade,
                              value.Semester,
                              paddedIdSubject,
                              value.SubjectName,
                              value.SubjectNameEnglish,
                              value.Credits,
                              value.Preq,
                              value.Type
                          ];
                          dataInsert.push(insertValues);
                      }
                      resolve();
                  }
              });
          }));
      }

      await Promise.all(queries);

      if (dataInsert.length === 0) {
          // No new data to insert, return error
          return res.status(400).send('All data is duplicate');
      }

      // Insert new subjects into the database
      const insertPromises = dataInsert.map(values => {
          return new Promise((resolve, reject) => {
              conn.query('INSERT INTO mastersubject (CourseYear,Major,StudentGrade,Semester,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq,Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, insertResult) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve();
                  }
              });
          });
      });

      await Promise.all(insertPromises);

      res.status(200).send('Data inserted successfully');
  } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing file');
  }
});



myApp.get('/export', (req, res) => {
  conn.query('SELECT * FROM subjectmanager', (error, results) => {
    if (error) throw error;

    // Convert data to xlsx format
    const worksheet = xlsx.utils.json_to_sheet(results);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write xlsx file to buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Send the file data back to the client
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  });
});

// Section: User details and login
myApp.get("/login/:email/:password", (request, response) => {
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


myApp.get("/teacherinfo/:id", (request, response) => {
  const  {id}  = request.params;
  conn.query('SELECT role, TeacherEmail FROM teacherinfo WHERE idTeacher =?',[id], (err, results) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Internal server error" });
    }else {
      response.send(results);
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

// Server start
myApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//TeacherSubject
myApp.get("/teachersubject/:TeacherName", (request, response) => {
  const { TeacherName } = request.params;
  var sql =
  "Select Day,Time,SubjectCode	,SubjectName	,Credit	,Sec	,Room FROM teacher WHERE TeacherName = ? ";
    

  conn.query(sql, [TeacherName], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//For Login
myApp.get("/forlogin/:Email/:Password", (request, response) => {
  const { Email,Password } = request.params;
  var sql =
  "Select * FROM masterteacher WHERE Email = ? AND Password = ?";
  conn.query(sql, [Email,Password], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//For Login
myApp.get("/forloginuserinfo/:idTeacher/:TeacherName/:TeacherSurname/:TeacherPhone/:TeacherEmail/:TeacherPassword/:Major/:Role", (request, response) => {
  const { idTeacher,TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,TeacherPassword,Major,Role } = request.params;
  var sql =
  "INSERT INTO teacherinfo (idTeacher,TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,TeacherPassword,Major,Role)"+
  "VALUE(?,?,?,?,?,?,?,?)";
  conn.query(sql, [idTeacher,TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,TeacherPassword,Major,Role], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//For Logout
myApp.get("/forlogout/:idTeacher", (request, response) => {
  const { idTeacher } = request.params;
  var sql =
  "DELETE FROM teacherinfo WHERE idTeacher = ?;"
  conn.query(sql, [idTeacher], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//userinfo
myApp.get("/userinfo", (request, response) => {
  var sql =
  "Select idTeacher,TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,TeacherPassword,Major,Role FROM teacherinfo";
  conn.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//Updatemaster
myApp.get("/updatemasterteacher/:TeacherName/:TeacherSurname/:Phone/:Email/:Major/:ID", (request, response) => {
  const { ID,TeacherName,TeacherSurname,Phone,Email,Major } = request.params;
  var sql =
  "UPDATE masterteacher SET TeacherName = ?, TeacherSurname = ?, Phone = ?, Email = ?, Major = ? WHERE ID = ?";
  conn.query(sql, [TeacherName,TeacherSurname,Phone,Email,Major,ID], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//Updateinfo
myApp.get("/updateteacherinfo/:TeacherName/:TeacherSurname/:TeacherPhone/:TeacherEmail/:Major/:idTeacher", (request, response) => {
  const { idTeacher,TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,Major } = request.params;
  var sql =
  "UPDATE teacherinfo SET TeacherName = ?, TeacherSurname = ?, TeacherPhone = ?, TeacherEmail = ?, Major = ? WHERE idTeacher = ?";
  conn.query(sql, [TeacherName,TeacherSurname,TeacherPhone,TeacherEmail,Major,idTeacher], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//Request
myApp.get("/request",(request,response) =>{
  var sql =
  "SELECT * FROM temp";
  conn.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
}); 

//Insertrequest
myApp.get("/insertrequest/:IsExternal/:SubjectCode/:SubjectName/:SubjectNameEnglish/:CourseYear/:Type/:Credits/:Sec/:StuNum/:LabSec/:LabStuNum/:LabRoom/:TeacherName/:TeacherSurname/:Major/:StudentGrade/:Day/:TimeStart/:TimeEnd/:Preq", (request, response) => {
  const { IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Type, Credits, Sec, StuNum, LabSec, LabStuNum, LabRoom, TeacherName, TeacherSurname, Major, StudentGrade, Day, TimeStart, TimeEnd, Preq } = request.params;
  var sql =
  "INSERT INTO temp (IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Type, Credits, Sec, StuNum, LabSec, LabStuNum, LabRoom, TeacherName, TeacherSurname, Major, StudentGrade, Day, TimeStart, TimeEnd, Preq)"+
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  conn.query(sql, [ IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Type, Credits, Sec, StuNum, LabSec, LabStuNum, LabRoom, TeacherName, TeacherSurname, Major, StudentGrade, Day, TimeStart, TimeEnd, Preq], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//Deleterequest
myApp.get("/deleterequest/:idTemp", (request, response) => {
  const { idTemp } = request.params;
  var sql =
  "DELETE FROM temp WHERE idTemp = ?;"
  conn.query(sql, [idTemp], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//Course
myApp.get("/course/:CourseYear",(request,response) =>{
  const { CourseYear } = request.params;
  var sql =
  "SELECT * FROM mastersubject WHERE CourseYear=?";
  conn.query(sql,[CourseYear], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//DeleteCourse
myApp.get("/deletecourse/:CourseYear",(request,response) =>{
  const { CourseYear } = request.params;
  var sql =
  "DELETE FROM mastersubject WHERE CourseYear=?";
  conn.query(sql,[CourseYear], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//-------------- 

//Course
myApp.get('/api/courses', (req, res) => {
  const query = "SELECT DISTINCT CourseYear FROM mastersubject";
  
  conn.query(query, (error, results) => {
      if (error) {
          res.status(500).json({ error: error.message });
          return;
      }
      res.json(results);
  });
});


myApp.delete('/api/courses/:year', (req, res) => {
  const { year } = req.params;
  const query = "DELETE FROM mastersubject WHERE CourseYear = ?";
  
  conn.query(query, [year], (error, results) => {
      if (error) {
          res.status(500).send({ error: error.message });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send({ message: 'No record found to delete' });
      } else {
          res.send({ message: 'Record deleted successfully' });
      }
  });
});

myApp.get('/api/subjects', (req, res) => {
  const query = "SELECT * FROM mastersubject ORDER BY StudentGrade, Semester";

  conn.query(query, (error, results) => {
      if (error) {
          res.status(500).json({ error: error.message });
          return;
      }
      res.json(results);
  });
});

//+
// Update subject details by unique identifier other than ID
myApp.put('/api/subjects/update', (req, res) => {
  const { SubjectCode, SubjectName, SubjectNameEnglish, Credits, Preq } = req.body;

  const query = "UPDATE mastersubject SET SubjectCode = ?, SubjectNameEnglish = ?, Credits = ?, Preq = ? WHERE SubjectName = ?";

  conn.query(query, [SubjectCode, SubjectNameEnglish, Credits, Preq, SubjectName], (error, results) => {
      if (error) {
          res.status(500).json({ error: error.message });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send({ message: 'No record found with this Subject Name' });
      } else {
          res.send({ message: 'Record updated successfully' });
      }
  });
});


// Assuming this is added to your existing server routes
myApp.delete('/api/subjects/delete/:subjectCode', (req, res) => {
  const { subjectCode } = req.params;
  const query = "DELETE FROM mastersubject WHERE SubjectCode = ?";
  
  conn.query(query, [subjectCode], (error, results) => {
      if (error) {
          res.status(500).send({ error: error.message });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send({ message: 'No record found with this Subject Code' });
      } else {
          res.send({ message: 'Record deleted successfully' });
      }
  });
});

//+++
myApp.get('/api/subjects/:year', (req, res) => {
  const { year } = req.params;
  const query = "SELECT * FROM mastersubject WHERE CourseYear = ? ORDER BY StudentGrade, Semester";
  
  conn.query(query, [year], (error, results) => {
      if (error) {
          res.status(500).json({ error: error.message });
          return;
      }
      res.json(results);
  });
});


myApp.post('/api/subjects/insert', (req, res) => {
  const { SubjectCode, SubjectNameEnglish, SubjectName, Credits, Preq, Major, Type, CourseYear, StudentGrade, Semester } = req.body;
  
  console.log('Received data for insert:', req.body);
  if (!CourseYear || !SubjectCode || !Credits || !Major) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = "INSERT INTO mastersubject (CourseYear, Major, StudentGrade, Semester, SubjectCode, SubjectName, SubjectNameEnglish, Credits, Preq, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  conn.query(query, [CourseYear, Major, StudentGrade, Semester, SubjectCode, SubjectName, SubjectNameEnglish, Credits, Preq, Type], (error, results) => {
    if (error) {
      console.error('Error during insertion:', error.message);
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ message: 'Record inserted successfully', data: results.insertId });
  });
});

//-----------------


//UpdateSubjectincourse
myApp.get("/updatecoursesubject/:SubjectCode/:SubjectName/:SubjectNameEnglish/:Credits/:Preq/:idSubject", (request, response) => {
  const { idSubject,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq } = request.params;
  var sql =
  "UPDATE mastersubject SET SubjectCode = ?, SubjectName = ?, SubjectNameEnglish = ?, Credits = ?, Preq = ? WHERE idSubject = ?";
  conn.query(sql, [SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq,idSubject], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//DeleterSubjectincourse
myApp.get("/deletecoursesubject/:idSubject", (request, response) => {
  const { idSubject } = request.params;
  var sql =
  "DELETE FROM mastersubject WHERE idSubject = ?;"
  conn.query(sql, [idSubject], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//insertSubjectincourse
myApp.get("/insertcoursesubject/:CourseYear/:Major/:StudentGrade/:Semester/:SubjectCode/:SubjectName/:SubjectNameEnglish/:Credits/:Preq", (request, response) => {
  const { CourseYear,Major,StudentGrade,Semester,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq } = request.params;
  var sql =
  "INSERT INTO mastersubject (CourseYear,Major,StudentGrade,Semester,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq)"+
  "VALUE(?,?,?,?,?,?,?,?,?)";
  conn.query(sql, [CourseYear,Major,StudentGrade,Semester,SubjectCode,SubjectName,SubjectNameEnglish,Credits,Preq], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


// Route to get all orders
myApp.get('/requests', (req, res) => {
  conn.query('SELECT courseCode, courseNameEN, numberOfStudents, status FROM requests', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

// Route to add a new order
myApp.post('/requests', (req, res) => {
  const { courseCode, courseNameEN, courseNameTH, prevCourse, courseCategory, credits, numberOfStudents, numberOfGroups, classYear, status } = req.body;
  const sql = 'INSERT INTO requests (courseCode, courseNameEN, courseNameTH, prevCourse, courseCategory, credits, numberOfStudents, numberOfGroups, classYear, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  conn.query(sql, [courseCode, courseNameEN, courseNameTH, prevCourse, courseCategory, credits, numberOfStudents, numberOfGroups, classYear, status], (err, result) => {
    if (err) {
      res.status(500).send('Error saving the order to database');
      return;
    }
    res.status(201).send({ id: result.insertId, ...req.body });
  });
});

// Route to delete an order
myApp.delete('/requests/:courseCode', (req, res) => {
  const { courseCode } = req.params;
  const sql = 'DELETE FROM requests WHERE courseCode = ?';
  conn.query(sql, [courseCode], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting the order from the database');
      return;
    }
    if (result.affectedRows == 0) {
      res.status(404).send('No order found with the given courseCode');
      return;
    }
    res.status(200).send({ message: 'Order deleted successfully' });
  });
});

// Route to update the status of an order
myApp.patch('/requests/:courseCode/status', (req, res) => {
  const { courseCode } = req.params;
  const { status } = req.body;  // 'Considered' or 'Not Considered'
  const sql = 'UPDATE requests SET status = ? WHERE courseCode = ?';

  conn.query(sql, [status, courseCode], (err, result) => {
    if (err) {
      res.status(500).send('Error updating the order in the database');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('No order found with the given courseCode');
      return;
    }
    res.status(200).send({ message: 'Order status updated successfully' });
  });
});


// //Manage
// myApp.get("/subjectmanager/:Year/:Semester",(request,response) =>{
//   const { Year,Semester } = request.params;
//   var sql =
//   "SELECT * FROM subjectmanager WHERE Year=? AND Semester=?";
//   conn.query(sql,[Year,Semester], (error, results) => {
//     if (error) {
//       console.log(error);
//       response.status(500).json({ error: "Internal server error" });
//     } else {
//       response.json(results);
//     }
//   });
// });


//Manage
//Manage
myApp.get("/subjectmanager",(request,response) =>{
  var sql = "SELECT IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits, groupCount, Preq FROM subjectmanager";
  conn.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});





//ManageInsert
myApp.get("/subjectmanagerinsert/:Year/:Semester/:IsExternal/:SubjectCode/:SubjectName/:SubjectNameEnglish/:Type/:Credits/:groupCount/:Preq", (request, response) => {
  const { Year, Semester, IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits, groupCount, Preq } = request.params;
  var sql =
  "INSERT INTO subjectmanager (Year, Semester, IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits, groupCount, Preq)"+
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conn.query(sql, [Year, Semester, IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits, groupCount, Preq], (error, results) => {
      if (error) {
          console.log(error);
          response.status(500).json({ error: "Internal server error" });
      } else {
          response.json(results);
      }
  });
});

//ManageEdit
myApp.get("/subjectmanagerupdate/:IsExternal/:SubjectCode/:SubjectName/:SubjectNameEnglish/:Type/:Credits/:groupCount/:Preq/:idSubjectManager", (request, response) => {
  const { IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits,groupCount, Preq, idSubjectManager } = request.params;
  var sql =
  "UPDATE subjectmanager SET IsExternal = ?, SubjectCode = ?,SubjectName = ?, SubjectNameEnglish = ?,Type = ?, Credits = ?,groupCount = ?, Preq = ? WHERE idSubjectManager = ?"
  conn.query(sql, [ IsExternal, SubjectCode, SubjectName, SubjectNameEnglish, Type, Credits,groupCount, Preq,idSubjectManager], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//DeleteManager
myApp.get("/subjectmanagerdelete/:idSubjectManager", (request, response) => {
  const { idSubjectManager } = request.params;
  var sql =
  "DELETE FROM subjectmanager WHERE idSubjectManager = ?"
  conn.query(sql, [idSubjectManager], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//Sec
myApp.get("/sec/:Year/:Semester/:SubjectCode",(request,response) =>{
  const { Year,Semester,SubjectCode } = request.params;
  var sql =
  "SELECT * FROM sec WHERE Year=? AND Semester=? AND SubjectCode=?";
  conn.query(sql,[Year,Semester,SubjectCode], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//InsertSec
myApp.get("/secinsert/:Year/:Semester/:SubjectCode/:Sec/:StuNum/:LabRoom/:TeacherName/:TeacherSurname/:Major/:CourseYear/:StudentGrade/:Day/:TimeStart/:TimeEnd/:SecType", (request, response) => {
  const { Year, Semester,SubjectCode, Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,SecType } = request.params;
  var sql =
  "INSERT INTO sec ( Year, Semester,SubjectCode,Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,SecType)"+
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  conn.query(sql, [Year, Semester,SubjectCode, Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,SecType], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});

//DeleteSec
myApp.get("/secdelete/:idSec", (request, response) => {
  const { idSec } = request.params;
  var sql =
  "DELETE FROM sec WHERE idSec"
  conn.query(sql, [idSec], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});


//EditSec
myApp.get("/secupdate/:Sec/:StuNum/:LabRoom/:TeacherName/:TeacherSurname/:Major/:CourseYear/:StudentGrade/:Day/:TimeStart/:TimeEnd/:idSec", (request, response) => {
  const {  Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,idSec } = request.params;
  var sql =
  "UPDATE sec SET Sec = ?, StuNum = ?,LabRoom = ?, TeacherName = ?,TeacherSurname = ?, Major = ?,CourseYear = ?, StudentGrade = ?,Day=?,TimeStart=?,TimeEnd=? WHERE idSec = ?"
  conn.query(sql, [ Sec, StuNum, LabRoom, TeacherName, TeacherSurname, Major, CourseYear, StudentGrade,Day,TimeStart,TimeEnd,idSec], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(results);
    }
  });
});



//-------
// Endpoint เพื่อดึงข้อมูลจากตาราง major
myApp.get('/api/major/classYear', (req, res) => {
  const sqlQuery = "SELECT StudentGrade, Major FROM major ORDER BY StudentGrade, Major";
  conn.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error fetching class year data:", error);
      return res.status(500).json({ error: "Failed to fetch class year data" });
    }
    const formattedResults = results.map(row => `${row.Major} (${row.StudentGrade})`);
    res.json(formattedResults);
  });
});

