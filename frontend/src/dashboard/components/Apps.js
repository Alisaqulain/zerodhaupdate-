import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCoins,
  faFileAlt,
  faBook,
  faBell,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

const appsData = [
  { name: "Kite", description: "Trading platform for stocks & derivatives", icon: faChartLine },
  { name: "Coin", description: "Mutual fund investment platform", icon: faCoins },
  { name: "Console", description: "Back office for reports and insights", icon: faFileAlt },
  { name: "Varsity", description: "Learn stock market investing", icon: faBook },
  { name: "Sentinel", description: "Price alerts for stocks & options", icon: faBell },
  { name: "Streak", description: "Algo trading without coding", icon: faRobot },
];

const Apps = () => {
  const containerStyle = { textAlign: "center", padding: "20px" };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
  };

  const iconStyle = { fontSize: "50px", color: "#387ed1", marginBottom: "10px" };

  const headingStyle = { fontSize: "18px", margin: "10px 0" };

  const textStyle = { fontSize: "14px", color: "gray" };

  const buttonStyle = {
    background: "#387ed1",
    color: "white",
    border: "none",
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2>Explore Zerodha Apps</h2>
      <div style={gridStyle}>
        {appsData.map((app, index) => (
          <div key={index} style={cardStyle}>
            <FontAwesomeIcon icon={app.icon} style={iconStyle} />
            <h3 style={headingStyle}>{app.name}</h3>
            <p style={textStyle}>{app.description}</p>
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.background = "#285a90")}
              onMouseOut={(e) => (e.target.style.background = "#387ed1")}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;