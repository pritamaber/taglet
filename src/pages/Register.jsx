import { useRef, useState } from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const avatarRef = useRef();

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const { registerUser, loading } = useRegister();
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    avatarRef.current.value = "";
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const avatar = avatarRef.current.files[0];

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    const result = await registerUser({ name, email, password, avatar });

    if (result.success) {
      setSuccess("✅ Registration successful! Redirecting...");
      resetForm();
      setRedirecting(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          👋 Join Taglet
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Create your account and start posting 🔥
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🧑 Name
          </label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Your name"
            required
            className="w-full border border-purple-200 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔁 Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="••••••••"
            required
            className="w-full border border-purple-200 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🖼️ Avatar
          </label>
          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            required
            className="w-full text-sm text-gray-600"
          />
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover mx-auto mt-3 border border-purple-300"
            />
          )}
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}
        {redirecting && (
          <p className="text-sm text-blue-600 text-center">
            Redirecting to login...
          </p>
        )}

        <button
          type="submit"
          disabled={loading || redirecting}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          {loading ? "Registering..." : "✨ Register"}
        </button>

        <div className="flex justify-between text-sm text-purple-600 mt-3">
          <Link to="/login" className="hover:underline">
            Already a user? Login
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
