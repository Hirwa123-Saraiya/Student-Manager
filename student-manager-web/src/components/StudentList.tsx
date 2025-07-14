// import React, { useState } from "react";
// import { Student } from "../types/Student";
// import "./Student-list.css";

// interface Props {
//   students: Student[];
//   removeStudent: (index: number) => void;
//   updateStudent: (updatedStudent: Student) => void;
// }

// const StudentList: React.FC<Props> = ({
//   students,
//   removeStudent,
//   updateStudent,
// }) => {
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editData, setEditData] = useState<Student>({
//     id: 0,
//     name: "",
//     age: 0,
//     marks: 0,
//   });

//   const startEdit = (student: Student, index: number) => {
//     setEditingIndex(index);
//     setEditData({ ...student });
//   };

//   const handleUpdate = () => {
//     updateStudent(editData);
//     setEditingIndex(null);
//   };

//   return (
//     <table className="student-table">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Age</th>
//           <th>Marks</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {students.map((student, index) => (
//           <tr key={student.id}>
//             {editingIndex === index ? (
//               <>
//                 <td>
//                   <input
//                     value={editData.name}
//                     onChange={(e) =>
//                       setEditData({ ...editData, name: e.target.value })
//                     }
//                   />
//                 </td>
//                 <td>
//                   <input
//                     value={editData.age}
//                     type="number"
//                     onChange={(e) =>
//                       setEditData({ ...editData, age: +e.target.value })
//                     }
//                   />
//                 </td>
//                 <td>
//                   <input
//                     value={editData.marks}
//                     type="number"
//                     onChange={(e) =>
//                       setEditData({ ...editData, marks: +e.target.value })
//                     }
//                   />
//                 </td>
//                 <td className="action-buttons">
//                   <button className="save-btn" onClick={handleUpdate}>
//                     💾 Save
//                   </button>
//                   <button className="cancel-btn" onClick={() => setEditingIndex(null)}>
//                     Cancel
//                   </button>
//                 </td>
//               </>
//             ) : (
//               <>
//                 <td>{student.name}</td>
//                 <td>{student.age}</td>
//                 <td>{student.marks}</td>
//                 <td className="action-buttons">
//                   <button className="edit-btn" onClick={() => startEdit(student, index)}>
//                     ✏️ Edit
//                   </button>
//                   <button className="remove-btn" onClick={() => removeStudent(index)}>
//                     ❌ Remove
//                   </button>
//                 </td>
//               </>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
// 
// export default StudentList;

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