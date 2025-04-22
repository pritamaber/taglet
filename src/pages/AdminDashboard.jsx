import React, { useState } from "react";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const tabs = ["Refund", "Feedback", "Support", "Revenue"];

export default function AdminDashboard() {
  const isAdmin = true;
  const {
    refunds,
    feedback,
    support,
    transactions,
    updateRefundStatus,
    getTotalRevenue,
    getTotalCredits,
    getWeeklyRevenue,
    userEmails,
    loading,
  } = useAdminDashboard(isAdmin);

  const [selectedTab, setSelectedTab] = useState("Refund");

  const exportToCSV = () => {
    const headers = ["User Email", "Razorpay ID", "Amount", "Credits", "Date"];
    const rows = transactions.map((tx) => [
      userEmails[tx.userId] ?? tx.userId,
      tx.razorpayId,
      tx.amount,
      tx.credits,
      new Date(tx.timestamp).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute(
      "download",
      `transactions-${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.setAttribute("href", encodedUri);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin)
    return <div className="text-center text-red-500 mt-10">Access Denied</div>;
  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              selectedTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border-purple-300"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Refund Tab */}
      {selectedTab === "Refund" && (
        <div className="space-y-4">
          {refunds.length === 0 && <p>No refund requests found.</p>}
          {refunds.map((item) => (
            <div
              key={item.$id}
              className="bg-white shadow p-4 rounded-md border space-y-1"
            >
              <p>
                <strong>User:</strong> {userEmails[item.userId] ?? item.userId}
              </p>
              <p>
                <strong>Credits:</strong> {item.credits}
              </p>
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              {item.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    onClick={() => {
                      updateRefundStatus(item.$id, "approved");
                      toast.success("Refund approved");
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    onClick={() => {
                      updateRefundStatus(item.$id, "rejected");
                      toast.error("Refund rejected");
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feedback Tab */}
      {selectedTab === "Feedback" && (
        <div className="space-y-4">
          {feedback.length === 0 && <p>No feedback found.</p>}
          {feedback.map((item) => (
            <div
              key={item.$id}
              className="bg-white shadow p-4 rounded-md border"
            >
              <p>
                <strong>User:</strong> {userEmails[item.userId] ?? item.userId}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.$createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Support Tab */}
      {selectedTab === "Support" && (
        <div className="space-y-4">
          {support.length === 0 && <p>No support queries found.</p>}
          {support.map((item) => (
            <div
              key={item.$id}
              className="bg-white shadow p-4 rounded-md border"
            >
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Query:</strong> {item.message}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.$createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Revenue Tab */}
      {selectedTab === "Revenue" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
            <div className="bg-white shadow-lg border-l-4 border-green-500 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-green-600">
                ₹ {getTotalRevenue()}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Total Revenue Collected
              </p>
            </div>
            <div className="bg-white shadow-lg border-l-4 border-blue-500 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-600">
                {getTotalCredits()}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Credits Sold</p>
            </div>
            <div className="bg-white shadow-lg border-l-4 border-purple-500 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-purple-600">
                ₹ {getWeeklyRevenue()}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Revenue This Week</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={exportToCSV}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              📤 Download CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
