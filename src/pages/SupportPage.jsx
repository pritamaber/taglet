import { useState } from "react";
import { databases, ID } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function SupportPage() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }
    setSubmitting(true);

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_SUPPORT,
        ID.unique(),
        {
          userId: user?.$id,
          email: user?.email,
          subject,
          message,
          createdAt: new Date().toISOString(),
        }
      );
      toast.success("Support request sent successfully.");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Error sending support request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-4 py-12 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          📬 Contact Support
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          For any queries or issues, fill the form below or email us at:{" "}
          <a
            href="mailto:support@taglet.in"
            className="text-purple-600 underline"
          >
            support@taglet.in
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <textarea
            rows={5}
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full text-sm"
          >
            {submitting ? "Sending..." : "Send Support Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
