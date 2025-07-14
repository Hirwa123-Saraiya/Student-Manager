import React, { useState } from "react";
import { Student } from "../types/Student";
import EditStudentModal from "./EditStudentModal";
import "./Student-list.css";

interface Props {
  students: Student[];
  removeStudent: (index: number) => void;
  updateStudent: (student: Student) => void;
}

const StudentList: React.FC<Props> = ({ students, removeStudent, updateStudent }) => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  return (
    <>
      <ul>
        {students.map((student, index) => (
          <li key={student.id}>
            <strong>{student.name}</strong> - Age: {student.age}, Marks: {student.marks}
            <button className="remove-btn" onClick={() => removeStudent(index)}>❌</button>
            <button className="edit-btn" onClick={() => setEditingStudent(student)}>✏️</button>
          </li>
        ))}
      </ul>

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={updateStudent}
      />
    </>
  );
};

export default StudentList;