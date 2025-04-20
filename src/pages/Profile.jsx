import { useAuth } from "../context/AuthContext";

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
          src={user.avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-300 shadow"
        />
        <h2 className="text-2xl font-extrabold text-purple-700">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-green-600 font-semibold">
          🎯 Credits: {user.credits ?? 0}
        </p>

        <button className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform">
          ✏️ Edit Profile (coming soon)
        </button>
      </div>
    </div>
  );
}
