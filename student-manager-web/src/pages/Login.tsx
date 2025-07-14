import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  setIsLoggedIn: (val: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isValidPassword = (password: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@_]{8,}$/;
    return pattern.test(password);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@(gmail\.com|yahoo\.in)$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(formData.email)) {
      setError("Only Gmail and Yahoo India emails are allowed.");
      return;
    }

    if (!isValidPassword(formData.password)) {
  setError("Password must be at least 8 characters long, contain 1 uppercase, 1 lowercase, and only use '@' or '_' as special characters.");
  setLoading(false);
  return;
}
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true); // ✅ set login state
        alert("Login successful!");
        navigate("/"); // ✅ redirect to home
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="redirect-text">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>

        <p className="redirect-text" style={{ marginTop: "1rem" }}>
          Forgot your password? <Link to="/forgot-password">Reset it</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
