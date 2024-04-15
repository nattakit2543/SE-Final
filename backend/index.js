// Importing required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');

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

    let sqlQuery = 'INSERT INTO subject (SubjectCode, SubjectName, SubjectNameEnglish, CourseYear, Credits, Type, Preq, StudentGrade, Major, Term) VALUES ';
    const dataInsert = [];
    data.forEach((value, index) => {
      sqlQuery += (index === 0 ? '(?' : ',(?)') + ', ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      dataInsert.push(
        value.SubjectCode, value.SubjectName, value.SubjectNameEnglish, value.CourseYear, value.Credits,
        value.Type, value.Preq, value.StudentGrade, value.Major, value.Term
      );
    });
    conn.query(sqlQuery, dataInsert, (error, results) => {
      if (error) return res.status(500).send('Error inserting data: ' + error);
      res.status(200).send('Data inserted successfully');
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
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
