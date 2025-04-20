import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-purple-700">⚙️ Settings</h1>
        <p className="text-gray-600 text-sm">
          This section is coming soon. You'll be able to manage your account and
          preferences here.
        </p>
        <p className="text-purple-500 text-xs mt-2">
          Got a suggestion?{" "}
          <a href="mailto:support@taglet.in" className="underline">
            Email us
          </a>{" "}
          or{" "}
          <Link to="/support" className="underline">
            submit a support request
          </Link>
        </p>
      </div>
    </div>
  );
}
