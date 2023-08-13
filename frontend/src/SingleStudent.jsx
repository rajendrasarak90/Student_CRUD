import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SingleStudent(props) {
  const { srno, student, deleteStudent, setStudents } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);

  const updateStudent = () => {
    if (age <= 0) {
      return toast.warning("Age should be positive interger");
    }
    if (name.length > 0) {
      axios
        .put(`/api/student/${student.id}`, { name, age })
        .then((response) => {
          setStudents((prevStudents) =>
            prevStudents.map((stu) =>
              stu.id === student.id ? response.data : stu
            )
          );
          setIsUpdate(!isUpdate);
          toast.success("Student updated successfully..!");
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    } else {
      return toast.warning("Name should not be empty");
    }
  };

  return (
    <tr>
      {isUpdate ? (
        <>
          <th scope="row">{srno}</th>
          <td>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td style={{ maxWidth: "20%" }}>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </td>
          <td>
            <button className="btn btn-success btn-sm" onClick={updateStudent}>
              Save
            </button>
          </td>
          <td>
            <button
              className="btn btn-info btn-sm"
              onClick={() => setIsUpdate(!isUpdate)}
            >
              Back
            </button>
          </td>
        </>
      ) : (
        <>
          <th scope="row">{srno}</th>
          <td>
            <p>{student.name}</p>
          </td>
          <td>
            <p>{student.age}</p>
          </td>
          <td>
            <button
              className="btn btn-success btn-sm"
              onClick={() => setIsUpdate(!isUpdate)}
            >
              Update
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
