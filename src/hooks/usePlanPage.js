import { useAuth } from "../context/AuthContext";
import { usePayment } from "./usePayment";
import { databases, ID } from "../appwrite/appwriteConfig";
import { toast } from "react-hot-toast";

export const usePlanPage = () => {
  const { user, setUser } = useAuth(); // ✅ Include setUser
  const { createOrder } = usePayment();

  const handleBuyCredits = async ({ amount, credits }) => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }

    try {
      const order = await createOrder({ amount, credits, userId: user.$id });
      if (!order?.success) throw new Error("Failed to create payment order");

      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: "INR",
        name: "Taglet",
        description: `Purchase of ${credits} credits`,
        order_id: order.order.id,
        handler: async (response) => {
          try {
            // 1️⃣ Fetch current user credits
            const userDoc = await databases.getDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
              user.$id
            );

            const currentCredits = userDoc.credits || 0;
            const newCreditBalance = currentCredits + Number(credits);

            // 2️⃣ Update user's credit balance
            await databases.updateDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
              user.$id,
              { credits: newCreditBalance }
            );

            // 2️⃣.5 ✅ Fetch updated user and update context to reflect changes instantly
            const updatedUserDoc = await databases.getDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
              user.$id
            );
            setUser(updatedUserDoc); // 👈 Live navbar update!

            // 3️⃣ Create transaction record
            await databases.createDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_COLLECTION_ID_TRANSACTIONS,
              ID.unique(),
              {
                userId: user.$id,
                razorpayId: response.razorpay_payment_id,
                amount: Number(amount),
                credits: Number(credits),
                timestamp: new Date().toISOString(),
              }
            );

            toast.success(`✅ ${credits} credits added to your account`);
          } catch (err) {
            console.error("❌ Error applying credits:", err);
            toast.error("Payment successful, but failed to apply credits.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#9333ea",
        },
      });

      razorpay.open();
    } catch (err) {
      console.error("❌ Checkout error:", err);
      toast.error(err.message || "Something went wrong during checkout");
    }
  };

  return { handleBuyCredits };
};
