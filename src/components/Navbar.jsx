import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";
import { useState } from "react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="ml-4 cursor-pointer">
        <h1 className="text-3xl font-poppins font-semibold flex items-center space-x-1">
          <span className="text-sky-400 hover:scale-110 transition-transform">
            #{""}
          </span>
          <span className="text-purple-500 hover:text-purple-400 hover:tracking-wider transition-all">
            taglet
          </span>
        </h1>
      </Link>

      <div className="flex items-center gap-6">
        {/* Navigation for logged-in users */}
        {!isAuthPage && user && (
          <div className="flex gap-6 text-gray-700 font-medium">
            <Link
              to="/create"
              className={`hover:text-purple-600 ${
                location.pathname === "/create"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              Create
            </Link>
            <Link
              to="/saved"
              className={`hover:text-purple-600 ${
                location.pathname === "/saved"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              Saved
            </Link>
          </div>
        )}

        {/* Dropdown for logged-in users */}
        {!isAuthPage && user && (
          <div className="relative">
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center cursor-pointer gap-2"
            >
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 ring-2 ring-white"
              />
              <span className="text-gray-800 font-medium text-sm">
                {user.name?.split(" ")[0] ?? "User"}
              </span>
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow z-10">
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
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Login/Register for unauthenticated users */}
        {!user && !isAuthPage && (
          <div className="flex gap-4 text-sm font-medium">
            <Link
              to="/login"
              className={`${
                location.pathname === "/login"
                  ? "text-purple-600 font-semibold underline"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${
                location.pathname === "/register"
                  ? "text-purple-600 font-semibold underline"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
