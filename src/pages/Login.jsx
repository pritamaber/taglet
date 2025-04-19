import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";

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
      // ✅ Create email/password session
      await account.createEmailPasswordSession(
        emailRef.current.value,
        passwordRef.current.value
      );

      // ✅ Get user and update context
      const loggedInUser = await account.get();
      setUser(loggedInUser);

      // ✅ Redirect to /create
      navigate("/create");
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
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
          Login to Caption-Pop
        </h2>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
