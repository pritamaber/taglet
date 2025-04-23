import { useAuth } from "../context/AuthContext";
import { usePlanPage } from "../hooks/usePlanPage";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PlanPage() {
  const { user } = useAuth();
  const { handleBuyCredits } = usePlanPage();
  const [loadingPlan, setLoadingPlan] = useState(null); // holds plan name being processed

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

  const handleClick = async (plan) => {
    setLoadingPlan(plan.name);
    try {
      await handleBuyCredits({
        amount: plan.price,
        credits: plan.credits,
      });
    } catch (err) {
      console.error("❌ Error during credit purchase:", err);
    } finally {
      setLoadingPlan(null);
    }
  };

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
              className={`relative p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col justify-between ${
                plan.recommended
                  ? "border-purple-500 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow font-semibold">
                  ⭐ Recommended
                </div>
              )}

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
                onClick={() => handleClick(plan)}
                disabled={plan.price === 0 || loadingPlan === plan.name}
                className={`mt-6 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 ${
                  plan.price === 0 || loadingPlan === plan.name
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loadingPlan === plan.name ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : plan.price === 0 ? (
                  "Already Active"
                ) : (
                  "Buy Now"
                )}
              </button>

              <p className="text-xs text-gray-400 mt-2 text-center">
                Refunds are not guaranteed. See our{" "}
                <Link to="/terms" className="underline text-purple-500">
                  Terms and Conditions
                </Link>
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          ⚡ <strong>1 credit = 1 caption generation</strong>
        </p>

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
