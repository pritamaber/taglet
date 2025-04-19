import { useAuth } from "../context/AuthContext";
import { usePayment } from "../hooks/usePayment";

export default function PlanPage() {
  const { user } = useAuth();
  const { createOrder } = usePayment();

  // Handles Razorpay checkout
  const handleBuyCredits = async ({ amount, credits }) => {
    if (!user) {
      alert("You must be logged in to buy credits.");
      return;
    }

    console.log("🔁 Calling createOrder...");
    const result = await createOrder({
      amount,
      credits,
      userId: user.$id,
    });

    console.log("📦 Full createOrder() result:", result);
    console.log("✅ result.success:", result?.success);
    console.log("📦 result.order:", result?.order);
    if (result?.error) {
      console.error("🛑 Razorpay order creation failed:", result.error);
    }

    if (!result || !result.success || !result.order?.id) {
      alert("❌ Failed to create Razorpay order.");
      return;
    }

    // Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.order.amount,
      currency: "INR",
      name: "CaptionPop",
      description: `Buy ${credits} credits`,
      order_id: result.order.id,
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#2563EB",
      },
      handler: async (response) => {
        console.log("✅ Razorpay Payment Success:", response);
        alert("✅ Payment successful.");
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          💳 Your Plan
        </h1>

        {/* User Plan Info */}
        <div className="text-center">
          <p className="text-gray-600">Current Plan:</p>
          <p className="text-xl font-semibold text-blue-600">Free</p>
        </div>

        {/* User Credits */}
        <div className="text-center">
          <p className="text-gray-600">Credits Remaining:</p>
          <p className="text-lg text-green-600 font-semibold">
            {user?.credits ?? 0}
          </p>
        </div>

        <hr />

        {/* Buy Credit Buttons */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            Buy More Credits
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => handleBuyCredits({ amount: 49, credits: 100 })}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              ₹49 – Get 100 Credits
            </button>
            <button
              onClick={() => handleBuyCredits({ amount: 129, credits: 300 })}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm"
            >
              ₹129 – Get 300 Credits
            </button>
            <button
              onClick={() => handleBuyCredits({ amount: 249, credits: 600 })}
              className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition text-sm"
            >
              ₹249 – Get 600 Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
