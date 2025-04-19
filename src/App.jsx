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
      {/* Global Navbar appears on all routes */}
      <Navbar />

      <Routes>
        {/* 🌐 Redirect root path to /create */}
        <Route path="/" element={<Navigate to="/create" />} />

        {/* 🔐 Auth pages (only visible to unauthenticated users) */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/create" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/create" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ✅ Protected main feature route */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Protected /saved page (placeholder for now) */}
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <div className="p-10 text-center text-xl text-gray-600">
                📁 Saved posts coming soon...
              </div>
            </ProtectedRoute>
          }
        />

        {/* 🚫 Catch-all 404 route */}
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
