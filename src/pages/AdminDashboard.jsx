import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@gmail.com";
  const { refunds, feedback, support, loading, updateRefundStatus } =
    useAdminDashboard(isAdmin);
  const [activeTab, setActiveTab] = useState("refunds");

  if (!isAdmin) {
    return <p className="text-center py-20 text-red-500">🚫 Access Denied</p>;
  }

  const renderTabContent = () => {
    if (loading)
      return <p className="text-center text-purple-600">Loading...</p>;

    switch (activeTab) {
      case "refunds":
        return refunds.map((r) => (
          <div key={r.$id} className="bg-white rounded-lg shadow p-4 border">
            <p className="text-sm text-gray-700">{r.reason}</p>
            <p className="text-xs text-gray-500 mt-1">
              {r.email} • {new Date(r.createdAt).toLocaleString()}
            </p>
            <span
              className={`mt-1 inline-block px-2 py-1 text-xs rounded-full text-white ${
                r.status === "approved"
                  ? "bg-green-500"
                  : r.status === "rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {r.status ?? "pending"}
            </span>
            <button
              onClick={() => updateRefundStatus(r.$id, "approved")}
              className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full mr-2 ml-2"
            >
              ✅ Approve
            </button>

            <button
              onClick={() => updateRefundStatus(r.$id, "rejected")}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-full"
            >
              ❌ Reject
            </button>
          </div>
        ));

      case "feedback":
        return feedback.map((f) => (
          <div key={f.$id} className="bg-white rounded-lg shadow p-4 border">
            <p className="text-sm text-gray-800">{f.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {f.email ?? "Anonymous"} •{" "}
              {new Date(f.createdAt).toLocaleString()}
            </p>
          </div>
        ));

      case "support":
        return support.map((s) => (
          <div key={s.$id} className="bg-white rounded-lg shadow p-4 border">
            <p className="text-sm font-medium text-gray-800">{s.subject}</p>
            <p className="text-sm text-gray-600 mt-1">{s.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {s.email} • {new Date(s.createdAt).toLocaleString()}
            </p>
          </div>
        ));

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          🛠 Admin Dashboard
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          {["refunds", "feedback", "support"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border border-purple-300"
              }`}
            >
              {tab === "refunds" && "💸 Refunds"}
              {tab === "feedback" && "💬 Feedback"}
              {tab === "support" && "📥 Support"}
            </button>
          ))}
        </div>

        <div className="space-y-4">{renderTabContent()}</div>
      </div>
    </div>
  );
}
