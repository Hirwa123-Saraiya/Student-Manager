import React, { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import Topper from "../components/Topper";
import { Student } from "../types/Student";
import "./Home.css";

const Home = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastRemoved, setLastRemoved] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterRange, setFilterRange] = useState({ min: 0, max: 100 });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const apiUrl = "http://localhost:5000/api/students";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const addStudent = async (student: Student) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const savedStudent = await response.json();
        setStudents([...students, savedStudent]);
      } else {
        console.error("Failed to add student.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeStudent = async (index: number) => {
    const studentToRemove = paginatedStudents[index];
    if (!studentToRemove.id) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${studentToRemove.name}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiUrl}/${studentToRemove.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updated = students.filter((s) => s.id !== studentToRemove.id);
        setStudents(updated);
        setLastRemoved(studentToRemove);
      } else {
        console.error("Failed to delete student from backend.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const undoRemove = () => {
    if (lastRemoved) {
      setStudents([...students, lastRemoved]);
      setLastRemoved(null);
    }
  };

  const updateStudent = async (student: Student) => {
    try {
      const response = await fetch(`${apiUrl}/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const updated = await response.json();
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const exportToCSV = () => {
    const csvHeader = "Name,Age,Marks,CreatedAt\n";
    const csvRows = students
      .map((s) => `${s.name},${s.age},${s.marks},${s.createdAt ?? ""}`)
      .join("\n");

    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split("T")[0];

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `students_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterBy === "marks"
          ? student.marks >= filterRange.min && student.marks <= filterRange.max
          : filterBy === "age"
          ? student.age >= filterRange.min && student.age <= filterRange.max
          : true;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "age-asc":
          return a.age - b.age;
        case "age-desc":
          return b.age - a.age;
        case "marks-asc":
          return a.marks - b.marks;
        case "marks-desc":
          return b.marks - a.marks;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const averageMarks =
    students.length > 0
      ? students.reduce((sum, s) => sum + s.marks, 0) / students.length
      : 0;
  const averageAge =
    students.length > 0
      ? students.reduce((sum, s) => sum + s.age, 0) / students.length
      : 0;
  const topper = [...students].sort((a, b) => b.marks - a.marks)[0];
  const failingStudents = students.filter((s) => s.marks < 35);

  const rankDistribution = {
    excellent: students.filter((s) => s.marks >= 90).length,
    good: students.filter((s) => s.marks >= 75 && s.marks < 90).length,
    average: students.filter((s) => s.marks >= 50 && s.marks < 75).length,
    poor: students.filter((s) => s.marks < 50).length,
  };

  return (
    <div className="App">
      <h2 className="page-title">Student Manager</h2>

      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
          <option value="age-asc">Age (Low → High)</option>
          <option value="age-desc">Age (High → Low)</option>
          <option value="marks-asc">Marks (Low → High)</option>
          <option value="marks-desc">Marks (High → Low)</option>
        </select>

        <select
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
            setFilterRange({ min: 0, max: 100 });
          }}
          className="sort-dropdown"
        >
          <option value="">Filter By</option>
          <option value="marks">Marks Range</option>
          <option value="age">Age Range</option>
        </select>

        {filterBy && (
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filterRange.min}
              onChange={(e) =>
                setFilterRange({ ...filterRange, min: Number(e.target.value) })
              }
              className="range-box"
            />
            <input
              type="number"
              placeholder="Max"
              value={filterRange.max}
              onChange={(e) =>
                setFilterRange({ ...filterRange, max: Number(e.target.value) })
              }
              className="range-box"
            />
          </div>
        )}
      </div>

      <table className="app-layout-table">
        <tbody>
          <tr>
            <td colSpan={2} className="full-width-cell">
              <div className="student-form-container">
                <StudentForm addStudent={addStudent} />
              </div>
            </td>
          </tr>

          <tr>
            <td className="main-content-cell">
              <div className="student-list-container">
                <StudentList
                  students={paginatedStudents}
                  removeStudent={removeStudent}
                  updateStudent={updateStudent}
                />
                <div className="pagination-controls">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </td>

            <td className="sidebar-cell">
              <div className="topper-container">
                <Topper students={filteredStudents} />
                <button
                  onClick={exportToCSV}
                  className="export-btn"
                  style={{ marginTop: "1rem" }}
                >
                  📥 Export to CSV
                </button>
              </div>
            </td>
          </tr>

          {lastRemoved && (
            <tr>
              <td colSpan={2} className="full-width-cell">
                <div className="undo-section">
                  <p className="removed-text">Removed: {lastRemoved.name}</p>
                  <button className="undo-btn" onClick={undoRemove}>
                    Undo
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="student-summary">
        <h3>📊 Student Summary</h3>
        <p>Total Students: {students.length}</p>
        <p>Average Marks: {averageMarks.toFixed(2)}</p>
        <p>Average Age: {averageAge.toFixed(2)}</p>
        <p>
          Topper: {topper?.name ?? "N/A"} ({topper?.marks ?? "-"} Marks)
        </p>
        <p>Failing Students: {failingStudents.length}</p>
      </div>
      <div className="rank-distribution">
        <h4>📚 Performance Breakdown</h4>
        <p>🏅 Excellent (90+): {rankDistribution.excellent}</p>
        <p>🎯 Good (75–89): {rankDistribution.good}</p>
        <p>📘 Average (50–74): {rankDistribution.average}</p>
        <p>⚠️ Needs Improvement (&lt;50): {rankDistribution.poor}</p>
      </div>
    </div>
  );
};

export default Home;
