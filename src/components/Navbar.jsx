import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwriteConfig";

export default function Navbar() {
  const { user, setUser } = useAuth();
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
      <Link to="/" className="text-xl font-bold text-blue-600">
        Caption-Pop
      </Link>

      {!isAuthPage && user && (
        <div className="flex items-center space-x-4">
          <Link
            to="/create"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Create
          </Link>
          <Link
            to="/saved"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Saved
          </Link>
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border cursor-pointer"
            onClick={() => navigate("/profile")}
          />
          <button
            onClick={handleLogout}
            className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
