import { useState } from "react";
import { databases, ID } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";

export default function Feedback() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter your feedback.");
    setSubmitting(true);

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_FEEDBACK,
        ID.unique(),
        {
          message,
          email,
          createdAt: new Date().toISOString(),
        }
      );
      setSuccess(true);
      setMessage("");
    } catch (err) {
      alert("❌ Failed to submit feedback: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12 flex justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          💬 Submit Feedback
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Have a bug to report or feature idea? Let us know!
        </p>

        {success && (
          <div className="mb-4 text-green-600 text-sm">
            ✅ Thanks for your feedback!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Type your feedback or bug report here..."
            className="w-full border border-purple-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="w-full border border-purple-200 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-purple-300"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-full shadow transition"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
