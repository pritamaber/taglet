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

      handler: async (response) => {
        toast.success("🎉 Payment successful!");

        const payload = {
          userId: user.$id,
          credits,
          amount,
          razorpayId: response.razorpay_payment_id,
        };
        console.log("📤 Payload to apply-credits function:", payload);

        try {
          const res = await fetch(
            `${import.meta.env.VITE_APPWRITE_ENDPOINT}/functions/${
              import.meta.env.VITE_APPWRITE_FUNCTION_ID_APPLY_CREDITS
            }/executions`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_PROJECT_ID,
                "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
              },
              body: JSON.stringify({
                data: payload, // 🔥 wrap payload in "data" key (Appwrite's REST format)
              }),
            }
          );

          const data = await res.json();
          console.log("✅ Cloud function response:", data);

          if (data?.success) {
            toast.success("✅ Credits applied to your account!");
          } else {
            toast.error("❌ Credits not applied. Please contact support.");
          }
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
