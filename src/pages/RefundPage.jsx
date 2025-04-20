import { useState } from "react";
import { databases, ID } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function RefundPage() {
  const { user } = useAuth();
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast("Please explain why you’re requesting a refund.");
      return;
    }
    setSubmitting(true);

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_REFUNDS,
        ID.unique(),
        {
          userId: user?.$id,
          email: user?.email,
          reason,
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      );
      toast.success("Request submitted. We’ll get back to you soon.");
      setReason("");
    } catch (err) {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-4 py-12 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          💸 Refund Request
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          By submitting, you agree that refunds are only issued for unused
          credits and at our sole discretion.
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Credits are instantly usable. We do not offer automatic refunds.
          However, in case of accidental purchases or duplicate payments, you
          may request a review.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={5}
            placeholder="Explain your reason for requesting a refund..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full text-sm"
          >
            {submitting ? "Submitting..." : "Submit Refund Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
