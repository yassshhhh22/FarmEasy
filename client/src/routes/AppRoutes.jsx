"use client";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Import pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FarmerDashboard from "../pages/dashboard/FarmerDashboard";
import BuyerDashboard from "../pages/dashboard/BuyerDashboard";
import ActiveContracts from "../pages/dashboard/ActiveContracts";
import PendingContracts from "../pages/dashboard/PendingContracts";
import TrackOrders from "../pages/dashboard/TrackOrders";
import ManageListings from "../pages/dashboard/ManageListings";
import AddNewCrop from "../pages/dashboard/AddNewCrop";
import SalesReports from "../pages/dashboard/SalesReports";
import Notifications from "../pages/Notifications";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Role-based Dashboard Redirect
const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType === "buyer") {
    return <Navigate to="/dashboard/buyer" replace />;
  } else if (user.userType === "farmer") {
    return <Navigate to="/dashboard/farmer" replace />;
  }

  return <Navigate to="/" replace />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={user ? <DashboardRedirect /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <DashboardRedirect /> : <SignupPage />}
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/buyer"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/farmer"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Shared Dashboard Pages */}
      <Route
        path="/dashboard/active-contracts"
        element={
          <ProtectedRoute>
            <ActiveContracts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/pending-contracts"
        element={
          <ProtectedRoute>
            <PendingContracts />
          </ProtectedRoute>
        }
      />

      {/* Farmer-only Routes */}
      <Route
        path="/dashboard/manage-listings"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <ManageListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/add-new-crop"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <AddNewCrop />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/sales-reports"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <SalesReports />
          </ProtectedRoute>
        }
      />

      {/* Common Routes */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
