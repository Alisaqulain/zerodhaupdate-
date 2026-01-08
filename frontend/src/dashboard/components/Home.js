// This component is now handled by DashboardLayout
// Keeping for backward compatibility
import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Home;