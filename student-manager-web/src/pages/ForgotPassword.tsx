import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = (password: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@_]{8}$/;
    return pattern.test(password);
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@(gmail\.com|yahoo\.in)$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isValidEmail(formData.email)) {
      setError("Only Gmail and Yahoo India emails are allowed.");
      return;
    }

    if (!isValidPassword(formData.newPassword)) {
      setError(
        "Password must be at least 8 characters long, contain 1 uppercase, 1 lowercase, and only use '@' or '_' as special characters."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.newPassword,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage("Password updated! Please login.");
        setFormData({ email: "", newPassword: "" }); // optional: reset form
      } else {
        setError(data.message || "Failed to update password.");
      }
    } catch {
      setLoading(false);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Registered Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
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

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;