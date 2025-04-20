import { useAuth } from "../context/AuthContext";
import { usePlanPage } from "../hooks/usePlanPage";
import { Link } from "react-router-dom";

export default function PlanPage() {
  const { user } = useAuth();
  const { handleBuyCredits } = usePlanPage();

  const plans = [
    {
      name: "Free Trial",
      price: 0,
      credits: 5,
      description: "Try Taglet with limited credits. No payment required.",
      recommended: false,
    },
    {
      name: "Starter",
      price: 19,
      credits: 25,
      description: "For light users — memes, reels, and quick posts.",
      recommended: false,
    },
    {
      name: "Pro",
      price: 49,
      credits: 100,
      description: "Perfect for active creators and small brands.",
      recommended: true,
    },
    {
      name: "Power",
      price: 119,
      credits: 250,
      description: "For daily creators, marketers, and meme lords.",
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          💳 Choose Your Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col justify-between ${
                plan.recommended ? "border-purple-500" : "border-gray-200"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold text-purple-700">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 mb-3">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {plan.price === 0 ? "Free" : `₹${plan.price}`}
                </p>
                <p className="text-xs text-gray-500">
                  {plan.credits} Credits Included
                </p>
              </div>

              <button
                onClick={() =>
                  handleBuyCredits({
                    amount: plan.price,
                    credits: plan.credits,
                  })
                }
                disabled={plan.price === 0}
                className={`mt-6 px-4 py-2 rounded-full text-white text-sm font-medium ${
                  plan.price === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {plan.price === 0 ? "Already Active" : "Buy Now"}
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Refunds are not guaranteed. See our{" "}
                <Link to="/refunds" className="underline text-purple-500">
                  refund policy
                </Link>
              </p>
            </div>
          ))}
          <p className="text-center text-xs text-gray-500 mt-4">
            ⚡ <strong>1 credit = 1 caption generation</strong>
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-10">
          Need more credits or want a custom plan?{" "}
          <Link to="/support" className="text-purple-600 hover:underline">
            Contact Us
          </Link>{" "}
          or{" "}
          <Link to="/refunds" className="text-purple-600 hover:underline">
            Request a Refund
          </Link>
        </p>
      </div>
    </div>
  );
}
