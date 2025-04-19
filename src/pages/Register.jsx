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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register to Caption-Pop
        </h2>

        <input
          ref={nameRef}
          type="text"
          placeholder="Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
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
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          ref={avatarRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          required
          className="w-full text-sm"
        />

        {preview && (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-20 h-20 rounded-full object-cover mx-auto mt-2 border"
          />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {redirecting && (
          <p className="text-sm text-blue-600 text-center">
            Redirecting to login...
          </p>
        )}

        <button
          type="submit"
          disabled={loading || redirecting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* 🔗 Bottom links */}
        <div className="flex justify-between text-sm text-blue-600 mt-2">
          <Link to="/login" className="hover:underline">
            Already have an account? Login
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
