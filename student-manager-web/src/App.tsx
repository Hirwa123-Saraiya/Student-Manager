// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import "./App.css"; 
// import ForgotPassword from "./pages/ForgotPassword";
// function App() {
//   return (
//     <Router>
//       <nav className="nav-bar">
//         <Link to="/" className="nav-link">Home</Link>
//         <Link to="/login" className="nav-link">Login</Link>
//         <Link to="/register" className="nav-link">Register</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
