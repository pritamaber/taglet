import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";
import { useState } from "react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="relative">
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
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

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                ⚙️ Settings
              </Link>
              <Link
                to="/plan"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                💳 Plan Info
              </Link>
              <button
                onClick={async () => {
                  await account.deleteSession("current");
                  setUser(null);
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
