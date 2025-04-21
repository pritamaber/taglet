// Updated Navbar.jsx with credits badge display
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideMenu = menuRef.current?.contains(e.target);
      const clickedInsideMobile = mobileRef.current?.contains(e.target);
      const clickedHamburger = e.target.closest(
        "button[aria-label='Toggle Menu']"
      );

      if (!clickedInsideMenu && !clickedHamburger) {
        setMenuOpen(false);
      }
      if (!clickedInsideMobile && !clickedHamburger) {
        setMobileNavOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
      setMobileNavOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="ml-2 cursor-pointer">
          <h1 className="text-3xl font-poppins font-semibold flex items-center space-x-1">
            <span className="text-sky-400 hover:scale-110 transition-transform">
              #
            </span>
            <span className="text-purple-500 hover:text-purple-400 hover:tracking-wider transition-all">
              taglet.in
            </span>
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        {!isAuthPage && user && (
          <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
            <Link
              to="/create"
              className={`hover:text-purple-600 ${
                location.pathname === "/create"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              ✍️ Create
            </Link>
            <Link
              to="/saved"
              className={`hover:text-purple-600 ${
                location.pathname === "/saved"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              📁 Saved
            </Link>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              🎯 {user?.credits ?? 0} Credits
            </span>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {user && (
          <button
            aria-label="Toggle Menu"
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            {mobileNavOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.5l4.714 4.715a.75.75 0 11-1.06 1.06L12 11.56l-4.715 4.715a.75.75 0 01-1.06-1.06L10.94 10.5 6.225 5.785a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15"
                />
              </svg>
            )}
          </button>
        )}

        {/* Avatar Dropdown */}
        {!isAuthPage && user && (
          <div ref={menuRef} className="relative ml-4 hidden md:block">
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
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow z-10 transition-transform transform origin-top-right scale-95 animate-dropdown-fade">
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
                <Link
                  to="/transactions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  💳 Transactions
                </Link>
                {user.email === "pritam.aber@gmail.com" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-purple-700 hover:bg-gray-100"
                  >
                    🛠 Admin Dashboard
                  </Link>
                )}
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

        {/* Auth links */}
        {!user && !isAuthPage && (
          <div className="flex gap-4 text-sm font-medium">
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "text-purple-600 font-semibold underline"
                  : "text-gray-700 hover:text-purple-600"
              }
            >
              Login
            </Link>
            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "text-purple-600 font-semibold underline"
                  : "text-gray-700 hover:text-purple-600"
              }
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Nav Panel */}
      {mobileNavOpen && user && (
        <div
          ref={mobileRef}
          className="md:hidden mt-4 space-y-2 border-t pt-4 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out animate-fade-in"
        >
          <Link
            to="/create"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            ✍️ Create
          </Link>
          <Link
            to="/saved"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            📁 Saved
          </Link>
          <hr className="my-2 border-t border-gray-200" />
          <Link
            to="/profile"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            👤 Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            ⚙️ Settings
          </Link>
          <Link
            to="/plan"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            💳 Plan Info
          </Link>
          <Link
            to="/transactions"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            💸 Transactions
          </Link>
          <hr className="my-2 border-t border-gray-200" />
          <div className="px-2 text-center text-green-700 text-xs font-semibold">
            🎯 {user?.credits ?? 0} Credits
          </div>
          <hr className="my-2 border-t border-gray-200" />
          {user.email === "pritam.aber@gmail.com" && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm text-purple-700 hover:bg-gray-100"
            >
              🛠 Admin Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-2 py-1 text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
}
