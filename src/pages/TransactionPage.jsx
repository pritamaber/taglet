import { useTransactions } from "../hooks/useTransactions";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const { getTransactions } = useTransactions();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load transaction history on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          💳 Transaction History
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div
                key={txn.razorpayId}
                className="bg-white shadow-md rounded-xl p-4 border border-purple-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-gray-700">
                      🆔 {txn.razorpayId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold text-lg">
                      +{txn.credits} Credits
                    </p>
                    <p className="text-sm text-gray-800">₹{txn.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
