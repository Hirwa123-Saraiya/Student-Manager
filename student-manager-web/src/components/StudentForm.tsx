import React, { useState } from "react";
import { Student } from "../types/Student";
import "./Student-form.css"; 

interface Props {
  addStudent: (student: Student) => void;
}

const StudentForm: React.FC<Props> = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = () => {
    addStudent({
      name,
      age: parseInt(age),
      marks: parseFloat(marks),
    });
    setName("");
    setAge("");
    setMarks("");
  };

  return (
    <div className="student-form">
      <input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
      <input value={age} type="number" placeholder="Age" onChange={e => setAge(e.target.value)} />
      <input value={marks} type="number" placeholder="Marks" onChange={e => setMarks(e.target.value)} />
      <button onClick={handleSubmit}>Add Student</button>
    </div>
  );
};

export default StudentForm;