import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <p className="text-purple-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6 text-center">
        <img
          src={
            user.avatarUrl?.startsWith("http")
              ? user.avatarUrl
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "U"
                )}`
          }
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-300 shadow"
        />
        <h2 className="text-2xl font-extrabold text-purple-700">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>

        <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl space-y-1">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-purple-600">🎯 Credits:</span>{" "}
            <span className="text-green-600 font-bold">
              {user.credits ?? 0}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            1 credit = 1 caption or hashtag generation
          </p>
        </div>

        <Link
          to="/transactions"
          className="inline-block mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          💳 View Transactions
        </Link>
      </div>
    </div>
  );
}
