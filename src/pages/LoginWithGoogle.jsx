// ✅ LoginWithGoogle.jsx
import React from "react";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function LoginWithGoogle() {
  const { loginWithGoogle } = useGoogleAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">
          Welcome to Taglet ✨
        </h1>
        <p className="text-sm text-gray-600">
          Login with your Google account to start generating captions &
          hashtags.
        </p>

        <button
          onClick={loginWithGoogle}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-3 shadow-md w-full"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
