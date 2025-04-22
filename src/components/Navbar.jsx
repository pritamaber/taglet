import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
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
            <span className="text-purple-500 hover:text-purple-400 transition-all">
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
            <Link
              to="/history"
              className={`hover:text-purple-600 ${
                location.pathname === "/history"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              📁 History
            </Link>
            <Link
              to="/plan"
              className={`hover:text-purple-600 ${
                location.pathname === "/plan"
                  ? "text-purple-600 font-semibold"
                  : ""
              }`}
            >
              💳 Buy Credits
            </Link>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              🎯 {user?.credits ?? 0} Credits left
            </span>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {user && (
          <button
            aria-label="Toggle Menu"
            className="md:hidden text-gray-600"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            {mobileNavOpen ? (
              <span className="text-xl">✖</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        )}

        {/* Avatar Dropdown (Desktop) */}
        {!isAuthPage && user && (
          <div ref={menuRef} className="relative ml-4 hidden md:block">
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center cursor-pointer gap-2"
            >
              <img
                src={
                  user.avatarUrl?.startsWith("http")
                    ? user.avatarUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "U"
                      )}`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 ring-2 ring-white"
              />
              <span className="text-gray-800 font-medium text-sm">
                {user.name?.split(" ")[0] ?? "User"}
              </span>
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow z-10 transition-transform origin-top-right scale-95 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  👤 Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  ⚙️ Settings
                </Link>
                <Link
                  to="/plan"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  💳 Plan Info
                </Link>
                <Link
                  to="/transactions"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  💸 Transactions
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

        {/* Auth link fallback */}
        {!user && !isAuthPage && (
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-purple-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* ✅ Mobile Nav Panel — updated */}
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
          <Link
            to="/history"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            📁 History
          </Link>

          <hr className="my-2 border-t border-gray-200" />

          <Link
            to="/plan"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            💳 Plan
          </Link>
          <Link
            to="/transactions"
            onClick={() => setMobileNavOpen(false)}
            className="block px-2 py-1 hover:text-purple-600"
          >
            💸 Transactions
          </Link>
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
          {user.email === "pritam.aber@gmail.com" && (
            <Link
              to="/admin"
              onClick={() => setMobileNavOpen(false)}
              className="block px-2 py-1 text-purple-700 hover:text-purple-500"
            >
              🛠 Admin
            </Link>
          )}
          <hr className="my-2 border-t border-gray-200" />
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
