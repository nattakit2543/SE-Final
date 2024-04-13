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


//ImportandExport วิชา section
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
      let sqlQuery = 'INSERT INTO subject (SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Credits, Type, Preq, StudentGrade, Major, Term) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const dataInsert = [];

      data.forEach((value, index) => {
          if (index !== 0) {
              sqlQuery += ', (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          }
          const paddedIdSubject = padWithLeadingZeros(value.SubjectCode, 10);
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
              value.Major,
              value.Term
              
          );
      });

      conn.query('SELECT * FROM subject WHERE SubjectCode = ?', [paddedIdSubject], (err, results) => {
        if (err) {
            reject(err);
        } else if (results.length === 0) {
            // If the subject does not exist, insert it into the subject table
            conn.query('INSERT INTO subject (SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Credits, Type, Preq, StudentGrade, Major, Term) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [paddedIdSubject,
              value.SubjectCode,
              value.SubjectName,
              value.SubjectNameEnglish,
              value.CourseYear,
              value.Credits,
              value.Type,
              value.Preq,
              value.StudentGrade,
              value.Major,
              value.Term], 
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
















//Login และ ข้อมูลผู้ใช้ Section
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