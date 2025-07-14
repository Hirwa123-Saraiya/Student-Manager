import React, { useState, useEffect } from "react";
import { Student } from "../types/Student";
import "./EditStudentModal.css";

interface Props {
  student: Student | null;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
}

const EditStudentModal: React.FC<Props> = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState<Student>({ id: 0, name: "", age: 0, marks: 0 });

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.name === "age" || e.target.name === "marks" ? +e.target.value : e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!student) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Student</h3>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
        <input name="marks" type="number" value={formData.marks} onChange={handleChange} placeholder="Marks" />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;