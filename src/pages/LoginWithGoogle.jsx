import React from "react";
import { motion } from "framer-motion";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function LoginWithGoogle() {
  const { loginWithGoogle } = useGoogleAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 relative overflow-hidden px-4 sm:px-6">
      {/* Animated Background Circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 0.6, 0.3] }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-pink-400 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.8], opacity: [0, 0.4, 0.2] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-52 h-52 sm:w-72 sm:h-72 bg-yellow-300 rounded-full filter blur-3xl opacity-30"
      />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl px-6 py-8 sm:p-10 w-full max-w-sm text-center z-10 space-y-6"
      >
        {/* Brand */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          🚀 Welcome to Taglet
        </motion.h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Login with Google and start crafting captions & hashtags effortlessly!
        </p>

        {/* Google Login Button */}
        <button
          onClick={loginWithGoogle}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-transform transform hover:scale-105 text-white font-semibold rounded-full shadow-lg py-2.5 px-4 sm:py-3 sm:px-6 w-full flex items-center justify-center gap-3"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm sm:text-base text-white font-medium">
            Sign in with Google
          </span>
        </button>

        <div className="text-xs text-gray-400 leading-relaxed">
          By signing in, you accept Taglet’s{" "}
          <a href="/terms" className="underline hover:text-purple-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-purple-500">
            Privacy Policy
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
}
