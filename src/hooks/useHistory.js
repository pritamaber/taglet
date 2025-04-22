import { databases } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Query } from "appwrite";

export const useHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID_HISTORY,
          [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
        );
        setHistory(res.documents);
      } catch (err) {
        console.error("Failed to fetch history:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return { history, loading };
};
