import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleStudent from "./SingleStudent";
import { toast } from "react-toastify";

export default function StudentPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchId, setSearchId] = useState("");
  const [students, setStudents] = useState([]);
  const [searchedStudents, setSearchedStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("/api/student")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const createStudent = () => {
    if (age <= 0) {
      return toast.warning("Age should be positive interger");
    }
    if (name.length > 0) {
      axios
        .post("/api/student", { name, age })
        .then((response) => {
          setName("");
          setAge("");
          setStudents((prevStudents) => [...prevStudents, response.data]);
          toast.success("Student created successfully..!");
        })
        .catch((error) => {
          console.error("Error creating student:", error);
        });
    } else {
      return toast.warning("Name should not be empty");
    }
  };

  const deleteStudent = (id) => {
    axios
      .delete(`/api/student/${id}`)
      .then((response) => {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
        toast.success("Student deleted Successfully..!");
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const deleteAllStudents = () => {
    axios
      .delete("/api/student")
      .then((response) => {
        setStudents([]);
        toast.success("All students deleted successfully..!");
      })
      .catch((error) => {
        console.error("Error deleting all students:", error);
      });
  };

  const searchStudents = () => {
    setSearchedStudents([]);
    axios
      .get(`/api/student/search?Name=${searchKeyword}`)
      .then((response) => {
        if (response.data.length > 0) {
          setSearchedStudents(response.data);
        } else {
          return toast.info("No students found for that Keyword");
        }
      })
      .catch((error) => {
        console.error("Error searching students:", error);
      });
  };

  const searchStudentById = () => {
    setSearchedStudents([]);
    axios
      .get(`/api/student/${searchId}`)
      .then((response) => {
        console.log("sudent data: ", response.data);
        if (response.data.name) {
          return setSearchedStudents((prevStudents) => [
            ...prevStudents,
            response.data,
          ]);
        }
        return toast.info("No student found with that ID");
      })
      .catch((error) => {
        console.error("Error searching students:", error);
      });
  };

  return (
    <div className="container mt-3">
      <div className="text-center mb-4 m-auto" style={{ maxWidth: "500px" }}>
        <h4>Create Student</h4>
        <div>
          <input
            type="text"
            name="name"
            className="form-control mb-1"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            name="age"
            className="form-control mb-1"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createStudent}>
            Create
          </button>
        </div>
      </div>
      <div>
        <h4 className="mb-1 text-center">Search Students</h4>
        <div className="d-flex justify-content-between gap-3 mb-3 mx-3">
          <div className="input-group " style={{ maxWidth: "500px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={searchStudents}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="input-group " style={{ maxWidth: "500px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="btn btn-primary" onClick={searchStudentById}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div style={{ minWidth: "100px" }}>
            <button className="btn btn-danger" onClick={deleteAllStudents}>
              Delete All
            </button>
          </div>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">SrNo</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchedStudents.length > 0
              ? searchedStudents.map((student, index) => (
                  <SingleStudent
                    key={`stud-${index}`}
                    srno={index + 1}
                    student={student}
                    deleteStudent={deleteStudent}
                    setStudents={setStudents}
                  />
                ))
              : students.map((student, index) => (
                  <SingleStudent
                    key={`stud-${index}`}
                    srno={index + 1}
                    student={student}
                    deleteStudent={deleteStudent}
                    setStudents={setStudents}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
