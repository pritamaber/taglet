import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Refs for input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  // Local component state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Access setUser from global auth context
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ✅ Create email/password session
      await account.createEmailPasswordSession(
        emailRef.current.value,
        passwordRef.current.value
      );

      // ✅ Optionally fetch user (not used due to refresh)
      const loggedInUser = await account.get();
      setUser(loggedInUser);

      // ✅ Force full app reload to ensure avatar/profile loads immediately
      window.location.href = "/create";
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to # taglet
        </h2>

        {/* Email Field */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Password Field */}
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔗 Navigation Links */}
        <div className="flex justify-between text-sm text-blue-600 mt-2">
          <Link to="/register" className="hover:underline">
            Don’t have an account? Register
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
