# CRUD Web App - MyrsaTech Solutions

This project is a basic CRUD (Create, Read, Update, Delete) web application developed as part of the recruitment process for MyrsaTech Solutions. The application allows users to manage student records by performing various operations such as creating, reading, updating, and deleting student data. It utilizes React.js for the frontend, Node.js with Express for the backend, and MySQL for the database.

## Hosted Links

1. FrontEnd : https://student-crud-front.onrender.com/
2. BackEnd : https://student-crud-back.onrender.com/

## Features

- Create new student records with a name and age.
- Retrieve a list of all students.
- Retrieve a single student record by ID.
- Update student records by ID.
- Delete individual student records by ID.
- Delete all student records.
- Search for students by name.

## API Endpoints

1. POST /api/student -> create new student
2. GET /api/student -> retrieve all students
3. GET /api/student/:id -> retrieve a student by :id
4. PUT /api/student/:id -> update a student by :id
5. DELETE /api/student/:id -> delete a student by :id
6. DELETE /api/student -> delete all student
7. GET /api/student?Name=[keyword] -> find all students whose name contains keyword.

## Technologies Used

- React.js: A popular JavaScript library for building user interfaces.
- Node.js: A runtime environment for executing JavaScript on the server.
- Express: A web application framework for Node.js, used for building APIs.
- MySQL: A relational database management system for storing and managing data.
