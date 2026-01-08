import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { GeneralContextProvider } from "./components/GeneralContext";

import Apps from "./components/Apps";
import Funds from "./components/Funds";
import Holdings from "./components/Holdings";
import Orders from "./components/Orders";
import Positions from "./components/Positions";
import Summary from "./components/Summary";
import WatchList from "./components/WatchList";
import PortfolioAnalytics from "./components/PortfolioAnalytics";
import PriceAlerts from "./components/PriceAlerts";
import WatchlistManager from "./components/WatchlistManager";
import TopBar from "./components/TopBar";
import Home from "./components/Home";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "var(--bg-color)",
  };

  const sidebarStyle = {
    width: isMobile ? "100%" : "250px",
    backgroundColor: "var(--card-bg)",
    borderRight: isMobile ? "none" : "1px solid var(--border-color)",
    borderBottom: isMobile ? "1px solid var(--border-color)" : "none",
    padding: "15px",
    transition: "all 0.3s ease",
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={dashboardStyle}>
          <GeneralContextProvider>
            <div style={sidebarStyle}>
              <WatchList />
            </div>
          </GeneralContextProvider>

          <div style={contentStyle}>
            <TopBar />
            <Routes>
              <Route exact path="/dashboard" element={<Summary />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/holdings" element={<Holdings />} />
              <Route path="/dashboard/positions" element={<Positions />} />
              <Route path="/dashboard/funds" element={<Funds />} />
              <Route path="/dashboard/apps" element={<Apps />} />
              <Route path="/dashboard/analytics" element={<PortfolioAnalytics />} />
              <Route path="/dashboard/alerts" element={<PriceAlerts />} />
              <Route path="/dashboard/watchlist-manager" element={<WatchlistManager />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;

