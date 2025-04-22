import { useAuth } from "../context/AuthContext";
import { databases, Query } from "../appwrite/appwriteConfig";

export const useTransactions = () => {
  const { user } = useAuth();

  /**
   * Fetch transaction history from Appwrite DB for current user
   * @returns {Promise<Array>} Array of transactions
   */
  const getTransactions = async () => {
    if (!user) {
      console.error("No authenticated user found.");
      return [];
    }

    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_TRANSACTIONS,
        [Query.equal("userId", user.$id), Query.orderDesc("timestamp")]
      );

      return response.documents.map((doc) => ({
        razorpayId: doc.razorpayId,
        amount: doc.amount,
        credits: doc.credits,
        timestamp: doc.timestamp,
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };

  return { getTransactions };
};
