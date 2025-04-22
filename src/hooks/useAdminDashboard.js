import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export const useAdminDashboard = (isAdmin) => {
  const [refunds, setRefunds] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [support, setSupport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchAll = async () => {
      try {
        const [r, f, s] = await Promise.all([
          databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID_REFUNDS,
            [Query.orderDesc("$createdAt")]
          ),
          databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID_FEEDBACK,
            [Query.orderDesc("$createdAt")]
          ),
          databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID_SUPPORT,
            [Query.orderDesc("$createdAt")]
          ),
        ]);
        setRefunds(r.documents);
        setFeedback(f.documents);
        setSupport(s.documents);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [isAdmin]);
  const updateRefundStatus = async (id, status) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_REFUNDS,
        id,
        { status }
      );

      // Optionally refetch or locally update state
      setRefunds((prev) =>
        prev.map((r) => (r.$id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("Failed to update refund status:", err.message);
    }
  };

  return { refunds, feedback, support, loading, updateRefundStatus };
};
