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
        <p className="text-sm text-gray-700 mt-2">
          We understand that sometimes things don’t go as planned. If you've
          made an accidental payment or have concerns about your purchase,
          you’re welcome to request a review.
        </p>

        <p className="text-xs text-gray-500 mt-2 mb-6">
          Please note: Refunds are not issued automatically. They are only
          considered for unused credits and are reviewed on a case-by-case
          basis. Refunds are issued solely at the discretion of the platform
          owner and may take several business days to process. By submitting
          this form, you agree to our refund policy.
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
