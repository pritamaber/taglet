import { useAuth } from "../context/AuthContext";

export const useTransactions = () => {
  const { user } = useAuth();

  /**
   * Fetch transaction history for the current user
   * Currently returns dummy data for testing
   */
  const getTransactions = async () => {
    if (!user) return [];

    // Simulated delay
    await new Promise((res) => setTimeout(res, 500));

    // Return dummy transactions
    return [
      {
        razorpayId: "pay_001ABCXYZ",
        amount: 49,
        credits: 100,
        timestamp: new Date().toISOString(),
      },
      {
        razorpayId: "pay_002XYZABC",
        amount: 99,
        credits: 250,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
    ];
  };

  return { getTransactions };
};
