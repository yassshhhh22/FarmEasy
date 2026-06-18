"use client";
import { Routes, Route, Navigate } from "react-router-dom";
// Import pages
import LandingPage from "../pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
