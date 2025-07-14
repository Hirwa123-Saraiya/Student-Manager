import React from "react";
import { Student } from "../types/Student";

interface Props {
  students: Student[];
}

const Topper: React.FC<Props> = ({ students }) => {
  if (students.length === 0) return null;
  const topper = students.reduce((top, curr) => curr.marks > top.marks ? curr : top);
  return (
    <h4 className="topper">
      🏆 Topper: {topper.name} ({topper.marks} marks)
    </h4>
  );
};

export default Topper;