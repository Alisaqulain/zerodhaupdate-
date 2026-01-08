
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import PortfolioAnalytics from "./PortfolioAnalytics";
import PriceAlerts from "./PriceAlerts";
import WatchlistManager from "./WatchlistManager";

import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  // ✅ Detect screen size for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Dashboard container styling
  const dashboardStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
  };

  // ✅ Sidebar styling
  const sidebarStyle = {
    width: isMobile ? "100%" : "250px",
    backgroundColor: "#ffffff",
    borderRight: isMobile ? "none" : "1px solid #ddd",
    borderBottom: isMobile ? "1px solid #ddd" : "none",
    padding: "15px",
    transition: "all 0.3s ease",
  };

  // ✅ Main content area styling
  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  };

  return (
    <div style={dashboardStyle}>
      {/* Sidebar */}
      <GeneralContextProvider>
        <div style={sidebarStyle}>
          <WatchList />
        </div>
      </GeneralContextProvider>

      {/* Main Content */}
      <div style={contentStyle}>
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/analytics" element={<PortfolioAnalytics />} />
          <Route path="/alerts" element={<PriceAlerts />} />
          <Route path="/watchlist-manager" element={<WatchlistManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;