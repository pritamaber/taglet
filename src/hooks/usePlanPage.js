import { useAuth } from "../context/AuthContext";
import { usePayment } from "./usePayment";
import { toast } from "react-hot-toast";

/**
 * Handles credit plan purchases via Razorpay.
 */
export const usePlanPage = () => {
  const { user } = useAuth();
  const { createOrder } = usePayment();

  const handleBuyCredits = async ({ amount, credits }) => {
    if (!user) {
      toast.error("You must be logged in to buy credits.");
      return;
    }

    const result = await createOrder({ amount, credits, userId: user.$id });

    if (!result?.success || !result.order?.id) {
      toast.error("❌ Failed to create Razorpay order.");
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
      handler: async () => {
        toast.success("🎉 Payment successful!");
        // Optional: refresh user credits here
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { handleBuyCredits };
};
