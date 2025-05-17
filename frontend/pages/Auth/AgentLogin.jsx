import { useState } from "react";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";
import "./auth.css";
const api_url = import.meta.env.VITE_API_URL

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Show loading spinner

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false); // Hide loading spinner
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      setLoading(false); // Hide loading spinner
      return;
    }

    try {
      const response = await fetch(`${api_url}/api/agent-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();


      setSuccess("Login Successful!");
      setFormData({ email: "", password: "" });


      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/agent-dashboard";
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false); // Hide loading spinner
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 return (
    <>
      <div className="bg-blue-500 mb-10">
        <Navbar />
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
        </div>
      )}
      <div className="login-container">
      {!loading &&<form onSubmit={handleSubmit} className="login-form">
          <h2>Agent Login</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="button">Login</button>
          <span className="adminRedirect">Login As An Admin <a href="/admin/login" className="text-blue-600 font-semibold">Login Here</a></span>
        </form>}
      </div>
      <Footer />
    </>
  );
};

export default Login;
