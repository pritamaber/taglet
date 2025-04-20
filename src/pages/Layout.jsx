import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="text-center text-xs text-gray-600 py-6 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-4 mb-2 text-purple-600">
          <Link to="/support" className="hover:underline">
            Support
          </Link>
          <Link to="/feedback" className="hover:underline">
            Feedback
          </Link>
          <Link to="/refunds" className="hover:underline">
            Refund Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} Taglet. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
