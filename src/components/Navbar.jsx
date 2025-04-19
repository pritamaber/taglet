import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar actions on login/register pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Left - Logo */}
      <Link to="/create" className="text-xl font-bold text-blue-600">
        Caption-Pop
      </Link>

      {/* Center - Nav Links (Only when logged in & not on auth pages) */}
      {!isAuthPage && user && (
        <div className="flex space-x-6 text-gray-700 font-medium">
          <Link
            to="/create"
            className={`hover:text-blue-600 ${
              location.pathname === "/create"
                ? "text-blue-600 font-semibold "
                : ""
            }`}
          >
            Create
          </Link>

          <Link
            to="/saved"
            className={`hover:text-blue-600 ${
              location.pathname === "/saved"
                ? "text-blue-600 font-semibold  "
                : ""
            }`}
          >
            Saved
          </Link>
        </div>
      )}

      {/* Right - Profile + Logout */}
      {/* Right - Profile + Logout */}
      {!isAuthPage && user && (
        <div className="flex items-center space-x-4">
          {/* Avatar + Name */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center cursor-pointer space-x-2"
          >
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 ring-2 ring-white"
            />
            <span className="text-gray-800 font-medium text-sm">
              {user.name?.split(" ")[0] ?? "User"}
            </span>
          </div>

          {/* Logout Link Style */}
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none p-0 m-0"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
