import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4 text-center">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto border"
        />
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-blue-600 font-semibold">
          🎯 Credits: {user.credits ?? 0}
        </p>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ✏️ Edit Profile (coming soon)
        </button>
      </div>
    </div>
  );
}
