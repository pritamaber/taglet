import { useAuth } from "../context/AuthContext";
import { usePayment } from "../hooks/usePayment";

export default function PlanPage() {
  const { user } = useAuth();
  const { createOrder } = usePayment();

  const handleBuyCredits = async ({ amount, credits }) => {
    if (!user) {
      alert("You must be logged in to buy credits.");
      return;
    }

    const result = await createOrder({ amount, credits, userId: user.$id });
    if (!result?.success || !result.order?.id) {
      alert("❌ Failed to create Razorpay order.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.order.amount,
      currency: "INR",
      name: "Taglet",
      description: `Buy ${credits} credits`,
      order_id: result.order.id,
      prefill: { name: user.name, email: user.email },
      theme: { color: "#9333ea" },
      handler: async (response) => {
        alert("✅ Payment successful.");
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-12 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-purple-700">
          💳 Your Plan
        </h1>

        <div className="text-center">
          <p className="text-gray-600">Current Plan:</p>
          <p className="text-xl font-bold text-purple-600">Free</p>
        </div>

        <div className="text-center">
          <p className="text-gray-600">Credits Remaining:</p>
          <p className="text-lg text-green-600 font-semibold">
            {user?.credits ?? 0}
          </p>
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold mb-4 text-center text-purple-700">
            Upgrade Your Credits
          </h2>
          <div className="grid gap-4">
            <button
              onClick={() => handleBuyCredits({ amount: 49, credits: 100 })}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-3 rounded-lg shadow-sm text-sm"
            >
              ₹49 – Get 100 Credits
            </button>
            <button
              onClick={() => handleBuyCredits({ amount: 129, credits: 300 })}
              className="bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold px-4 py-3 rounded-lg shadow-sm text-sm"
            >
              ₹129 – Get 300 Credits
            </button>
            <button
              onClick={() => handleBuyCredits({ amount: 249, credits: 600 })}
              className="bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold px-4 py-3 rounded-lg shadow-sm text-sm"
            >
              ₹249 – Get 600 Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
