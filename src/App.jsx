import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Toast
import { Toaster } from "react-hot-toast";

// Pages
import CreatePage from "./pages/CreatePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SavedPage from "./pages/SavedPage";
import Settings from "./pages/Settings";
import PlanPage from "./pages/PlanPage";
import LandingPage from "./pages/LandingPage";
import Feedback from "./pages/Feedback";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth context
import { useAuth } from "./context/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* 🚀 Landing Page by default if not logged in */}
        <Route
          path="/"
          element={user ? <Navigate to="/create" /> : <LandingPage />}
        />

        {/* {Feedbackroute} */}
        <Route path="/feedback" element={<Feedback />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/create" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/create" replace />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Pages */}
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
