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
import LoginWithGoogle from "./pages/LoginWithGoogle";
import OAuthCallback from "./pages/OAuthCallback";
import Profile from "./pages/Profile";
import SavedPage from "./pages/SavedPage";
import Settings from "./pages/Settings";
import PlanPage from "./pages/PlanPage";
import LandingPage from "./pages/LandingPage";
import Feedback from "./pages/Feedback";
import TransactionPage from "./pages/TransactionPage";
import RefundPage from "./pages/RefundPage";
import SupportPage from "./pages/SupportPage";
import TermsPage from "./pages/TermsPage";
import Layout from "./pages/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import HistoryPage from "./pages/HistoryPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";

// Components
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

      <Routes>
        <Route element={<Layout />}>
          {/* Public Entry */}
          <Route
            path="/"
            element={user ? <Navigate to="/create" replace /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={
              !user ? <LoginWithGoogle /> : <Navigate to="/create" replace />
            }
          />
          <Route path="/auth-callback" element={<OAuthCallback />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

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
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
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
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refunds"
            element={
              <ProtectedRoute>
                <RefundPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              user?.email === "pritam.aber@gmail.com" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-red-500">
                🚫 404 - Page not found
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
