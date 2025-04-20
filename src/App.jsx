import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import CreatePage from "./pages/CreatePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SavedPage from "./pages/SavedPage";
import Settings from "./pages/Settings";
import PlanPage from "./pages/PlanPage";
import Home from "./pages/Home";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth context
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth status to load before rendering anything
  if (loading) return null;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 👤 Public home or redirect if logged in */}
        <Route path="/" element={user ? <Navigate to="/create" /> : <Home />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/create" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/create" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
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
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <PlanPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-red-500">
              🚫 404 - Page not found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
