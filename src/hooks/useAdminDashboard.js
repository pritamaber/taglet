import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export const useAdminDashboard = (isAdmin) => {
  const [refunds, setRefunds] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [support, setSupport] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmails, setUserEmails] = useState({});

  useEffect(() => {
    if (!isAdmin) return;

    const fetchAll = async () => {
      try {
        const [r, f, s, t] = await Promise.all([
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
          databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID_TRANSACTIONS,
            [Query.orderDesc("$createdAt")]
          ),
        ]);
        setRefunds(r.documents);
        setFeedback(f.documents);
        setSupport(s.documents);
        setTransactions(t.documents);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [isAdmin]);

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
          []
        );
        const lookup = {};
        for (let doc of res.documents) {
          lookup[doc.$id] = doc.email; // or doc.name if preferred
        }
        setUserEmails(lookup);
      } catch (err) {
        console.error("Failed to fetch user emails:", err.message);
      }
    };

    if (isAdmin) fetchUserEmails();
  }, [isAdmin]);

  const updateRefundStatus = async (id, status) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_REFUNDS,
        id,
        { status }
      );
      setRefunds((prev) =>
        prev.map((r) => (r.$id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("Failed to update refund status:", err.message);
    }
  };

  const getTotalRevenue = () =>
    transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const getTotalCredits = () =>
    transactions.reduce((sum, tx) => sum + (tx.credits || 0), 0);

  const getWeeklyRevenue = () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return transactions
      .filter((tx) => new Date(tx.timestamp) >= oneWeekAgo)
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);
  };

  return {
    refunds,
    feedback,
    support,
    transactions,
    loading,
    updateRefundStatus,
    getTotalRevenue,
    getTotalCredits,
    getWeeklyRevenue,
    userEmails,
  };
};
