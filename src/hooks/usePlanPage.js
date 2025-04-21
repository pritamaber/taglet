import { useAuth } from "../context/AuthContext";
import { usePayment } from "./usePayment";
import { toast } from "react-hot-toast";
import { functions } from "../appwrite/appwriteConfig";

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
      handler: async (response) => {
        toast.success("🎉 Payment successful!");
        console.log("💳 Razorpay response:", response); // should include .razorpay_payment_id

        // Apply credits to user after payment
        try {
          await functions.createExecution(
            import.meta.env.VITE_APPWRITE_FUNCTION_ID_APPLY_CREDITS,
            JSON.stringify({
              userId: user.$id,
              credits,
              amount,
              razorpayId: response.razorpay_payment_id, // ✅ THIS must come from param
            })
          );

          toast.success("✅ Credits applied to your account!");
        } catch (err) {
          console.error("❌ Failed to apply credits:", err.message);
          toast.error("Failed to update credits. Please contact support.");
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { handleBuyCredits };
};
