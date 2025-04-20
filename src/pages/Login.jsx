import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion"; // 👈 Add this

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await account.createEmailPasswordSession(
        emailRef.current.value,
        passwordRef.current.value
      );
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      window.location.href = "/create";
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          🔐 Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Log in to continue using Taglet
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📧 Email
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="you@example.com"
            required
            className="w-full border border-purple-200 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔒 Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="••••••••"
            required
            className="w-full border border-purple-200 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          {loading ? "Logging in..." : "✨ Login"}
        </button>

        <div className="flex justify-between text-sm text-purple-600 mt-3">
          <Link to="/register" className="hover:underline">
            New here? Register
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
