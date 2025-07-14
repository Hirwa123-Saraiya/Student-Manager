// import React, { useState } from "react";
// import "./App.css";

// interface Student {
//   name: string;
//   age: number;
//   marks: number;
// }

// function App() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [marks, setMarks] = useState("");
//   const [lastRemoved, setLastRemoved] = useState<Student | null>(null);

//   const addStudent = () => {
//     const newStudent: Student = {
//       name,
//       age: parseInt(age),
//       marks: parseFloat(marks),
//     };
//     setStudents([...students, newStudent]);
//     setName("");
//     setAge("");
//     setMarks("");
//   };

//   // const removeStudent = (indexToRemove: number) => {
//   //   const updated = students.filter((_, index) => index !== indexToRemove);
//   //   setStudents(updated);
//   // };

//   const removeStudent = (indexToRemove: number) => {
//     const toRemove = students[indexToRemove];
//     const updated = students.filter((_, index) => index !== indexToRemove);
//     setStudents(updated);
//     setLastRemoved(toRemove);
//   };

//   const undoRemove = () => {
//     if (lastRemoved) {
//       setStudents([...students, lastRemoved]);
//       setLastRemoved(null);
//     }
//   };

//   const getTopper = (): Student | null => {
//     if (students.length === 0) return null;
//     return students.reduce((topper, student) =>
//       student.marks > topper.marks ? student : topper
//     );
//   };

//   const topper = getTopper();

//   return (
//     <div className="App">
//       <h2>Student Manager</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Marks"
//           value={marks}
//           onChange={(e) => setMarks(e.target.value)}
//         />
//         <button onClick={addStudent}>Add Student</button>
//       </div>

//       <h3>Students List:</h3>
//       <ul>
//         {students.map((student, index) => (
//           <li key={index}>
//             {student.name} - Age: {student.age}, Marks: {student.marks}
//           </li>
//         ))}
//       </ul>

//       <ul>
//         {students.map((student, index) => (
//           <li key={index}>
//             {student.name} - Age: {student.age}, Marks: {student.marks}
//             <button
//               style={{ marginLeft: "10px" }}
//               onClick={() => removeStudent(index)}
//             >
//               ❌ Remove
//             </button>
//           </li>
//         ))}
//       </ul>

//       {lastRemoved && (
//         <div>
//           <p>Removed: {lastRemoved.name}</p>
//           <button className="undo" onClick={() => undoRemove()}>
//             Undo
//           </button>
//         </div>
//       )}

//       {topper && (
//         <h4>
//           🏆 Topper: {topper.name} ({topper.marks} marks)
//         </h4>
//       )}
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here in future */}
      </Routes>
    </Router>
  );
}

export default App;
