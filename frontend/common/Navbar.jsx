import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./common.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch UUID from cookies when the component mounts
    const uuid = Cookies.get("uuid");
    const token = Cookies.get("token");
    const agentToken = Cookies.get("agentToken");

    if (uuid || token || agentToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove all relevant cookies
    Cookies.remove("uuid");
    Cookies.remove("token");
    Cookies.remove("agentToken");

    // Optional: redirect to login or home
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-logo">AgentDesk</a>

        <div className="navbar-links">
          {isAuthenticated ? (
            <button
              className="navbar-button dashboard-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <a className="navbar-button login-btn" href="/agent/login">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
