const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

// create database pool using user and password
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "raj2001@90abc%67",
  database: "student_db",
});

// check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error in connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL successfully.");
  connection.release();
});

// cross origin resource sharing for allowing req from frontend
app.use(cors());
// express json for parsing inconming req and make it available into req.body object
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully..!");
});

// Get all the Students from Database
app.get("/api/student", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Failed to retrieve students" });
      return;
    }
    res.json(result);
  });
});

// Search students into database based on keyword
app.get("/api/student/search", (req, res) => {
  const { Name } = req.query;
  db.query(
    "SELECT * FROM students WHERE name LIKE ?",
    [`%${Name}%`],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Failed to search students" });
        return;
      }
      res.json(result);
    }
  );
});

// get student by using ID
app.get("/api/student/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM students WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Failed to retrieve student" });
      return;
    }
    if (result.length === 0) {
      return res.json({});
    }
    return res.json(result[0]);
  });
});

// Create new student
app.post("/api/student", (req, res) => {
  const { name, age } = req.body;
  db.query(
    "INSERT INTO students (name, age) VALUES (?, ?)",
    [name, age],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Failed to create student" });
        return;
      }
      res.json({ id: result.insertId, name, age });
    }
  );
});

// Update existing student using ID
app.put("/api/student/:id", (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  db.query(
    "UPDATE students SET name = ?, age = ? WHERE id = ?",
    [name, age, id],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Failed to update student" });
        return;
      }
      res.json({ id, name, age });
    }
  );
});

// Delete student using ID
app.delete("/api/student/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Failed to delete student" });
      return;
    }
    res.json({ message: "Student deleted", id });
  });
});

// Delete all students from database
app.delete("/api/student", (req, res) => {
  db.query("DELETE FROM students", (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Failed to delete all students" });
      return;
    }
    res.json({ message: "All students deleted" });
  });
});

// run server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in running server");
  }
  console.log("Server is running successfully on PORT:", PORT);
});
