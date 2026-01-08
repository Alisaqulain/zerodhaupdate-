import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";
import RealTimeIndices from "./RealTimeIndices";
import NotificationSystem from "./Notifications";
import "./TopBar.css";

const TopBar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="topbar-container">
      <div className="topbar-content">
        {/* Real-time Indices */}
        <div className="indices-section">
          <RealTimeIndices />
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          <NotificationSystem />
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-name">{user?.name || 'User'}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">Login</Link>
              <Link to="/signup" className="auth-btn signup-btn">Signup</Link>
            </div>
          )}
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;